import { eventChannel } from "redux-saga";
import { take, call, all, race, select, put } from 'redux-saga/effects';

import { SEND_MESSAGE, SET_MATCH_ID, receiveMessage, closeWebSocket, CLOSE_WEB_SOCKET, RECONNECT_TO_WEB_SOCKET, connectedToWebSocket, disconnectedFromWebSocket } from "../actions/conversation.actions";
import { DOMAIN } from "../config/url";

export function createSocketChannel(socket) {
  return eventChannel(emit => {
    socket.onopen = () => {
      emit('open');
    }
    socket.onmessage = event => {
      const serverMessage = JSON.parse(event.data);
      emit(serverMessage);
    };

    socket.onclose = () => {
      emit('close');
    }

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  });
}

export function* receiveMessagesWatcher(socketChannel) {
  while(true) {
    const message = yield take(socketChannel);
    if (message === 'close') {
      yield put(disconnectedFromWebSocket());
      yield put(closeWebSocket());
    } else if (message === 'open') {
      yield put(connectedToWebSocket());
    } else {
      yield put(receiveMessage(message));
    }
  }
}

export function* sendMessagesWatcher(socket, match_id, to_id) {
  while(true) {
    const { message } = yield take(SEND_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}

export default function* messagesWatcher() {

  let match_id, to_id, otherUser;
  while (true) {
  try {
      const from_id = yield select(state => state.user.user_id);
      const { setMatchIdAction } = yield race({
        setMatchIdAction: take(SET_MATCH_ID),
        reconnectToWebSocketAction: take(RECONNECT_TO_WEB_SOCKET),
      });
      const socket = new WebSocket(`ws://${DOMAIN}/user/conversation?from_id=${from_id}`);
      // const socket = io(`http://${DOMAIN}`);
      const socketChannel = yield call(createSocketChannel, socket, match_id);

      yield race({
      listeners: all([
        call(receiveMessagesWatcher, socketChannel),
        call(sendMessagesWatcher, socket, match_id, to_id),
      ]),
      close: take(CLOSE_WEB_SOCKET),
      });

      yield socketChannel.close();
    } catch(e) {
      console.error(e.message);
    }
  }
}

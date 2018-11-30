import { eventChannel } from "redux-saga";
import { take, call, all, race, select, put } from 'redux-saga/effects';
import axios from 'axios';

import { SEND_MESSAGE, SET_MATCH_ID, receiveMessage, closeWebSocket, CLOSE_WEB_SOCKET, RECONNECT_TO_WEB_SOCKET, connectedToWebSocket, disconnectedFromWebSocket, setMessages } from "../actions/conversation.actions";
import { HOST } from "../config/url";
import handleResponseError from '../utils/handleResponseError';

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

export function* sendMessagesWatcher(socket) {
  while(true) {
    const { message } = yield take(SEND_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}

export default function* messagesWatcher() {

  let match_id;
  while (true) {
  try {
      const { setMatchIdAction } = yield race({
        setMatchIdAction: take(SET_MATCH_ID),
        reconnectToWebSocketAction: take(RECONNECT_TO_WEB_SOCKET),
      });
      if (setMatchIdAction) {
        ({ match_id } = setMatchIdAction);
        try {
          const messagesResponse = yield axios.get(`http://${HOST}/user/message/all/${match_id}`);
          const { data: { rows: messages } } = messagesResponse;
          yield put(setMessages(messages));
        } catch(error) {
          handleResponseError(error);
        }
      }
      const from_id = yield select(state => state.user.user_id);
      const socket = new WebSocket(`ws://${HOST}/user/conversation?from_id=${from_id}`);
      const socketChannel = yield call(createSocketChannel, socket, match_id);

      yield race({
      listeners: all([
        call(receiveMessagesWatcher, socketChannel),
        call(sendMessagesWatcher, socket),
      ]),
      close: take(CLOSE_WEB_SOCKET),
      });

      yield socketChannel.close();
    } catch(e) {
      console.error(e.message);
    }
  }
}

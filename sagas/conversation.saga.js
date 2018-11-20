import { eventChannel } from "redux-saga";
import { take, call, all, race, select, put } from 'redux-saga/effects';
// import io from 'socket.io-client';

import { SEND_MESSAGE, SET_MATCH_ID, receiveMessage } from "../actions/conversation.actions";
import { DOMAIN } from "../config/url";

export function createSocketChannel(socket, match_id) {
  return eventChannel(emit => {
    socket.onopen = () => {
      socket.send(JSON.stringify({
        event: 'INIT',
        match_id,
      }));
    }

    socket.onmessage = event => {
      const serverMessage = JSON.parse(event.data);
      emit(serverMessage);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  });
}

export function* receiveMessagesWatcher(socketChannel) {
  while(true) {
    const message = yield take(socketChannel);
    yield put(receiveMessage(message));
  }
}

export function* sendMessagesWatcher(socket, match_id, to_id) {
  while(true) {
    const { message } = yield take(SEND_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}

export default function* messagesWatcher() {
  const { match_id, to_id } = yield take(SET_MATCH_ID);
  const from_id = yield select(state => state.user.user_id);
  while (true) {
  try {
      const socket = new WebSocket(`ws://${DOMAIN}/user/conversation?match_id=${match_id}&to_id=${to_id}&from_id=${from_id}`);
      // const socket = io(`http://${DOMAIN}`);
      const socketChannel = yield call(createSocketChannel, socket, match_id);

      yield race({
      listeners: all([
        call(receiveMessagesWatcher, socketChannel),
        call(sendMessagesWatcher, socket, match_id, to_id),
      ]),
      close: take(SET_MATCH_ID),
      });

      yield socketChannel.close();
    } catch(e) {
      console.error(e.message);
    }
  }
}

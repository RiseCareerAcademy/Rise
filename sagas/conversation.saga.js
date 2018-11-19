import { eventChannel } from "redux-saga";
import { take, call, all, race, select} from 'redux-saga/effects';

import { SEND_MESSAGE } from "../actions/conversation.actions";
import { DOMAIN } from "../config/url";
import { SET_MATCH_ID } from "../actions/matches.actions";

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
    console.log(message);
  }
}

export function* sendMessagesWatcher(socket, match_id, to_id) {
  while(true) {
    const { message: message_body } = yield take(SEND_MESSAGE);
    const from_id = yield select(state => state.user.user_id);

    const message = {
      match_id,
      to_id,
      from_id,
      message_body,
    };

    socket.send(JSON.stringify(message));
  }
}

export default function* messagesWatcher() {
  while (true) {
    const { match_id, to_id } = yield take(SET_MATCH_ID);
    try {
      const socket = new WebSocket(`ws://${DOMAIN}/user/conversation`);
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

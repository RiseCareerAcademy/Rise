import { eventChannel } from "redux-saga";
import { take, call, all, race } from 'redux-saga/effects';
import { SET_RECEIVER } from "../actions/conversation.actions";

const wsUrl = '/conversation';

export function createSocketChannel(socket) {
  return eventChannel(emit => {
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

export default function* messagesWatcher() {
	while (true) {
	  yield take(SET_RECEIVER);
	  // FIXME: Need to gracefully handle WS not connected errors.
	  const socket = new WebSocket(wsUrl);
	  const socketChannel = yield call(createSocketChannel, socket);
  
	  yield race({
		listeners: all([
		  call(receiveMessagesWatcher, socketChannel),
		  call(sendMessagesWatcher, socket),
		]),
		close: take(SET_RECEIVER),
	  });
  
	  yield socketChannel.close();
	  yield put(disconnectedFromWs());
	}
  }
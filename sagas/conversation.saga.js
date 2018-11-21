import { eventChannel } from "redux-saga";
import { take, call, all, race } from "redux-saga/effects";
import { SET_RECEIVER } from "../actions/conversation.actions";

const wsUrl = "/conversation";

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
    try {
      const from_id = yield select(state => state.user.user_id);
      const { setMatchIdAction } = yield race({
        setMatchIdAction: take(SET_MATCH_ID),
        reconnectToWebSocketAction: take(RECONNECT_TO_WEB_SOCKET)
      });
      if (setMatchIdAction) {
        ({ match_id, to_id, otherUser } = setMatchIdAction);
      }
      const socket = new WebSocket(
        `ws://${DOMAIN}/user/conversation?from_id=${from_id}`
      );
      // const socket = io(`http://${DOMAIN}`);
      const socketChannel = yield call(createSocketChannel, socket, match_id);

      yield race({
        listeners: all([
          call(receiveMessagesWatcher, socketChannel),
          call(sendMessagesWatcher, socket, match_id, to_id)
        ]),
        close: take(CLOSE_WEB_SOCKET)
      });

      yield socketChannel.close();
    } catch (e) {
      console.error(e.message);
    }
  }
}

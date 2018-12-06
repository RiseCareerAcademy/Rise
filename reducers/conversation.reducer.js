import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  SET_RECEIVER_ID,
  SET_MATCH_ID,
  CLEAR_MESSAGES,
  CONNECTED_TO_WEB_SOCKET,
  DISCONNECTED_FROM_WEB_SOCKET,
  SET_MESSAGES,
} from "../actions/conversation.actions";

const initialState = {
  receiverId: undefined,
  match_id: undefined,
  to_id: undefined,
  messages: [],
  connectedToWebSocket: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [action.message, ...state.messages],
      };
    }
    case RECEIVE_MESSAGE: {
      return {
        ...state,
        messages: [action.message, ...state.messages],
      };
    }
    case SET_RECEIVER_ID: {
      return {
        ...state,
        receiverId: action.receiverId,
      };
    }
    case SET_MATCH_ID: {
      return {
        ...state,
        match_id: action.match_id,
        to_id: action.to_id,
      };
    }
    case CLEAR_MESSAGES: {
      return {
        ...state,
        messages: [],
      };
    }
    case CONNECTED_TO_WEB_SOCKET: {
      return {
        ...state,
        connectedToWebSocket: true,
      }
    }
    case DISCONNECTED_FROM_WEB_SOCKET: {
      return {
        ...state,
        connectedToWebSocket: false,
      }
    }
    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      }
    }
    default:
      return state;
  }
};

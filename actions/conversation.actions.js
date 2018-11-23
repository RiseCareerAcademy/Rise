export const SEND_MESSAGE = "conversation/SEND_MESSAGE";
export const RECEIVE_MESSAGE = "conversation/RECEIVE_MESSAGE";
export const SET_RECEIVER_ID = "conversation/SET_RECEIVERID";
export const SET_MATCH_ID = "conversation/SET_MATCH_ID";
export const ADD_MESSAGE = 'conversation/ADD_MESSAGE';
export const CLEAR_MESSAGES = 'conversation/CLEAR_MESSAGES';
export const CLOSE_WEB_SOCKET = 'conversation/CLOSE_WEB_SOCKET';
export const RECONNECT_TO_WEB_SOCKET = 'conversation/RECONNECT_TO_WEB_SOCKET';
export const CONNECTED_TO_WEB_SOCKET = 'conversation/CONNECTED_TO_WEB_SOCKET';
export const DISCONNECTED_FROM_WEB_SOCKET = 'conversation/DISCONNECTED_FROM_WEB_SOCKET';

const uuidv1 = require('uuid/v1');

/**
 * Sends message to server.
 * @param {Object} message
 */
export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message: {
    ...message,
    timestamp: (new Date()).getTime(),
    message_id: uuidv1(),
  },
});

/**
 * Receive message from server.
 * @param {Object} message
 */
export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message,
});

/**
 * Sets receiver of the conversation.
 * @param {Number} receiverId
 */
export const setReceiverId = receiverId => ({
  type: SET_RECEIVER_ID,
  receiverId,
});

export const setMatchId = (match_id, to_id) => ({
  type: SET_MATCH_ID,
  match_id,
  to_id,
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
})

export const closeWebSocket = () => ({
  type: CLOSE_WEB_SOCKET,
});

export const reconnectToWebSocket = () => ({
  type: RECONNECT_TO_WEB_SOCKET,
});

export const connectedToWebSocket = () => ({
  type: CONNECTED_TO_WEB_SOCKET,
});

export const disconnectedFromWebSocket = () => ({
  type: DISCONNECTED_FROM_WEB_SOCKET,
});

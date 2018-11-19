export const SET_MESSAGES = "messages/SET_MESSAGES";
export const ADD_MESSAGE = "messages/ADD_MESSAGE";
export const GET_MESSAGES = "messages/GET_MESSAGES";

/**
 * Sets messages.
 * @param {Array} messages
 */
export const setMessages = messages => ({
  type: SET_MESSAGES,
  messages
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

export const getMessages = () => ({
  type: GET_MESSAGES
});

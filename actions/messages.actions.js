export const SET_MESSAGES = 'messages/SET_MESSAGES';
export const ADD_MESSAGE = 'messages/ADD_MESSAGE';

/**
 * Sets messages.
 * @param {Array} messages 
 */
export const setMessage = (messages) => ({
	type: SET_MESSAGES,
	messages,
});

export const addMessage = (message) => ({
	type: ADD_MESSAGE,
	message,
});

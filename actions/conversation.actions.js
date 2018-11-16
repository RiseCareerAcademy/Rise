export const SEND_MESSAGE = 'conversation/SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'conversation/RECEIVE_MESSAGE';
export const SET_RECEIVER = 'conversation/SET_RECEIVER';

/**
 * Sends message to server.
 * @param {Object} message 
 */
export const sendMessage = (message) => ({
	type: SEND_MESSAGE,
	message,
});

/**
 * Receive message from server.
 * @param {Object} message 
 */
export const receiveMessage = (message) => ({
	type: RECEIVE_MESSAGE,
	message,
});

/**
 * Sets receiver of the conversation.
 * @param {Number} receiverId 
 */
export const setReceiver = (receiverId) => ({
	type: SET_RECEIVER,
	receiverId,
})

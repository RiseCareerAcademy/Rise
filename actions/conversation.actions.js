export const SEND_MESSAGE = 'conversation/SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'conversation/RECEIVE_MESSAGE';
export const SET_RECEIVER_ID = 'conversation/SET_RECEIVERID';
export const SET_MATCH_ID = 'conversation/SET_MATCH_ID';

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
export const setReceiverId = (receiverId) => ({
	type: SET_RECEIVER_ID,
	receiverId,
})

export const setMatchId = (match_id, to_id) => ({
	type: SET_MATCH_ID,
	match_id,
	to_id,
})

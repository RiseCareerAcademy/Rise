import { sendMessage, SEND_MESSAGE, receiveMessage, RECEIVE_MESSAGE, setReceiver, SET_RECEIVER } from '../conversation.actions';

describe('sendMessage', () => {
	it('creates a SEND_MESSAGE action with a message', () => {
		const message = 'MyMessage';
		expect(sendMessage(message)).toEqual({
			type: SEND_MESSAGE,
			message
		})
	})
})

describe('receiveMessage', () => {
	it('creates a RECEIVE_MESSAGE action with a message', () => {
		const message = 'MyMessage';
		expect(receiveMessage(message)).toEqual({
			type: RECEIVE_MESSAGE,
			message
		})
	})
})

describe('setReceiver', () => {
	it('rcreates a SET_RECEIVER action with a number', () => {
		const receiverId = 5;
		expect(setReceiver(receiverId)).toEqual({
			type: SET_RECEIVER,
			receiverId
		})
	})
})

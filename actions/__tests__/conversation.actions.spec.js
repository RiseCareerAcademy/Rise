import { sendMessage, SEND_MESSAGE } from '../conversation.actions';

describe('sendMessage', () => {
	it('creates a SEND_MESSAGE action with a message', () => {
		const message = 'MyMessage';
		expect(sendMessage(message)).toEqual({
			type: SEND_MESSAGE,
			message
		})
	})
})
import {setMessage, SET_MESSAGES, addMessage, ADD_MESSAGE} from '../messages.actions'

describe('setMessage', () => {
	it('creates a setMessage action with a message', () => {
		const messages = 'MyMessage';
		expect(setMessage(messages)).toEqual({
			type: SET_MESSAGES,
			messages
		})
	})
})

describe('addMessage', () => {
	it('creates a addMessage action with a message', () => {
		const message = 'MyMessage';
		expect(addMessage(message)).toEqual({
			type: ADD_MESSAGE,
			message
		})
	})
})
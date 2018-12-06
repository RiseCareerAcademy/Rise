import { sendMessage, SEND_MESSAGE } from '../conversation.actions';

jest.mock('uuid/v1', () => () => 1);

const constantDate = new Date('2017-06-13T04:41:20')

/*eslint no-global-assign:off*/
Date = class extends Date {
  constructor() {
    super();
    return constantDate
  }
}

describe('sendMessage', () => {
	it('creates a SEND_MESSAGE action with a message', () => {
		const message = { message_body: 'MyMessage' };
		expect(sendMessage(message)).toEqual({
      type: SEND_MESSAGE,
      message: {
        message_body: 'MyMessage',
        timestamp: (new Date).getTime(),
        message_id: 1,
      },
		})
	})
})

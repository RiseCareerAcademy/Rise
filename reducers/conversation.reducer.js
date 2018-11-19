import { SEND_MESSAGE, RECEIVE_MESSAGE, SET_RECEIVER_ID, SET_MATCH_ID } from "../actions/conversation.actions";

const initialState = {
	fromMessages: [],
	toMessages: [],
	receiverId: undefined,
	match_id: undefined,
	to_id: undefined,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SEND_MESSAGE: {
			return {
				...state,
				toMessages: [...state.toMessages, action.message]
			};
		}
		case RECEIVE_MESSAGE: {
			return {
				...state,
				fromMessages: [...state.fromMessages, action.message],
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
		default:
			return state;
	}
}
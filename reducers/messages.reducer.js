import { SET_MESSAGES, ADD_MESSAGE } from "../actions/messages.actions";

export const initialState = [];

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_MESSAGES:
			return action.messages;
		case ADD_MESSAGE:
			return [...state, action.message];
		default:
			return state;
	}
};
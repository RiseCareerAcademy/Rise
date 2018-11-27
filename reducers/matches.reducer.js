import { SET_MATCHES } from "../actions/matches.actions";

const initialState = {
	users: [],
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_MATCHES:
			return {
				...state,
				users: action.users,
			};
		default:
			return state;
	}
}

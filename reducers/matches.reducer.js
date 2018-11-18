import { SET_MATCHES } from "../actions/matches.actions";

const initialState = {
	mentors: [],
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_MATCHES:
			return {
				...state,
				mentors: action.mentors,
			};
		default:
			return state;
	}
}

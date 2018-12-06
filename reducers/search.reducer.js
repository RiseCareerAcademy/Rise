import { SET_MENTORS, SET_MENTEES, SET_MATCHES } from "../actions/search.actions";

const initialState = {
  matches: [],
	mentors: [],
	mentees: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_MATCHES:
			return {
				...state,
				matches: action.matches,
			};
		case SET_MENTORS:
			return {
				...state,
				mentors: action.mentors,
			};
		case SET_MENTEES:
			return {
				...state,
				mentees: action.mentees,
			}
		default:
			return state;
	}
}

import { SET_MENTORS, SET_MENTEES } from "../actions/search.actions";

const initialState = {
	mentors: [],
	mentees: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
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
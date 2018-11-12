import { SET_MENTEES, SET_MENTORS } from '../actions/users-search.actions';

export const initialState = [];

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_MENTEES:
			return {
				...state,
				mentees: action.mentees,
			};
		case SET_MENTORS:
			return {
				...state,
				mentors: action.mentors,
			};
		default:
			return state;
	}
}

import { SET_USER, REGISTER_MENTEE, FAILED_REGISTER_MENTEE, LOGOUT_USER, SET_USER_FIELDS, REGISTER_MENTOR, FAILED_REGISTER_MENTOR } from "../actions/user.actions";

export const initialState = {
	loggedIn: false,
	registering: false,
	error: null,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_USER:
			return {
				...state,
				...action.user,
				loggedIn: true,
			};
		case REGISTER_MENTEE:
			return {
				...state,
				registering: true,
			}
		case FAILED_REGISTER_MENTEE:
			return {
				...state,
				registering: false,
				error: action.error,
			}
		case FAILED_REGISTER_MENTOR:
			return {
				...state,
				registering: false,
				error: action.error,
			}
		case LOGOUT_USER:
			return initialState;
		case SET_USER_FIELDS:
			return {
				...state,
				...action.fields,
			};
		case REGISTER_MENTOR:
			return {
				...state,
				registering: true,
			};
		default:
			return state;
	}
}
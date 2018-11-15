import { SET_USER, REGISTER_MENTEE, FAILED_REGISTER_MENTEE, LOGOUT_USER } from "../actions/user.actions";

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
		case LOGOUT_USER:
			return initialState;
		default:
			return state;
	}
}
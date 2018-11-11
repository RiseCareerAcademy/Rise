import { SET_USER, REGISTER_MENTEE, FAILED_REGISTER_MENTEE } from "../actions/user.actions";

export const initialState = {
	loggedIn: false,
	registering: false,
	error: null,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_USER:
			return {
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
		default:
			return state;
	}
}
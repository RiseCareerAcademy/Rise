import { SET_USER } from "../actions/user.actions";

export const initialState = {
	loggedIn: false,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_USER:
			return {
				...action.user,
				loggedIn: true,
			};
		default:
			return state;
	}
}
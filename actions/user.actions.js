export const SET_USER = 'user/SET_USER';
export const GET_USER = 'user/GET_USER';
export const REGISTER_MENTEE = 'user/REGISTER_MENTEE';

export const setUser = user => ({
	type: SET_USER,
	user,
});

export const getUser = userId => ({
	type: GET_USER,
	userId,
})

export const registerMentee = mentee => ({
	type: REGISTER_MENTEE,
	mentee,
});

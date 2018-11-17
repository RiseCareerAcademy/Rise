export const GET_ALL_MENTORS = 'search/GET_ALL_MENTORS';
export const GET_ALL_MENTEES = 'search/GET_ALL_MENTEES';
export const SET_MENTORS = 'search/SET_MENTORS';
export const SET_MENTEES = 'search/SET_MENTEES';

export const getAllMentors = () => ({
	type: GET_ALL_MENTORS,
});

export const getAllMentees = () => ({
	type: GET_ALL_MENTEES,
});

export const setMentors = mentors => ({
	type: SET_MENTORS,
	mentors,
});

export const setMentees = mentees => ({
	type: SET_MENTEES,
	mentees,
});

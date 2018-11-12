export const GET_ALL_MENTORS = 'users-search/GET_ALL_MENTORS';
export const GET_ALL_MENTEES = 'users-search/GET_ALL_MENTEES';
export const SET_MENTORS = 'users-search/SET_MENTORS';
export const SET_MENTEES = 'users-search/SET_MENTEES';

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
})
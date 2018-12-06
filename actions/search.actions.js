export const GET_ALL_MENTORS = 'search/GET_ALL_MENTORS';
export const GET_ALL_MENTEES = 'search/GET_ALL_MENTEES';
export const GET_ALL_MATCHES = 'search/GET_ALL_MATCHES';
export const SET_MENTORS = 'search/SET_MENTORS';
export const SET_MENTEES = 'search/SET_MENTEES';
export const SET_MATCHES = 'search/SET_MATCHES';
export const GET_MENTOR = 'search/GET_MENTOR';
export const GET_MENTEE = 'search/GET_MENTEE';

export const getAllMentors = () => ({
	type: GET_ALL_MENTORS,
});

export const getAllMentees = () => ({
	type: GET_ALL_MENTEES,
});

export const getAllMatches = () => ({
  type: GET_ALL_MATCHES,
});

export const setMentors = mentors => ({
	type: SET_MENTORS,
	mentors,
});

export const setMatches = matches => ({
	type: SET_MATCHES,
	matches,
});

export const setMentees = mentees => ({
	type: SET_MENTEES,
	mentees,
});

export const getMentor = user_id => ({
	type: GET_MENTOR,
	user_id,
});

export const getMentee = user_id => ({
	type: GET_MENTEE,
	user_id,
});

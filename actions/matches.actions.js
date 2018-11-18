export const GET_MATCHES = 'matches/GET_MATCHES';
export const SET_MATCHES = 'matches/SET_MATCHES';

export const getMatches = () => ({
	type: GET_MATCHES,
});

export const setMatches = mentors => ({
	type: SET_MATCHES,
	mentors,
})

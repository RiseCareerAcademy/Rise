export const GET_MATCHES = 'matches/GET_MATCHES';
export const SET_MATCHES = 'matches/SET_MATCHES';
export const CREATE_MATCH = 'matches/CREATE_MATCH';
export const SET_MATCH_ID = 'matches/SET_MATCH_ID';

export const getMatches = () => ({
	type: GET_MATCHES,
});

export const setMatches = mentors => ({
	type: SET_MATCHES,
	mentors,
})

export const createMatch = user_id => ({
	type: CREATE_MATCH,
	user_id,
})

export const setMatchId = match_id => ({
	type: SET_MATCH_ID,
	match_id,
});

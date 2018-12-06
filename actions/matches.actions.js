export const GET_SUGGESTED_MENTOR_MATCHES = 'matches/GET_SUGGESTED_MENTOR_MATCHES';
export const GET_SUGGESTED_MENTEE_MATCHES = 'matches/GET_SUGGESTED_MENTEE_MATCHES';
export const SET_MATCHES = 'matches/SET_MATCHES';
export const CREATE_MATCH = 'matches/CREATE_MATCH';
export const SET_MATCH_ID = 'matches/SET_MATCH_ID';

export const getSuggestedMentorMatches = () => ({
	type: GET_SUGGESTED_MENTOR_MATCHES,
});

export const getSuggestedMenteeMatches = () => ({
	type: GET_SUGGESTED_MENTEE_MATCHES,
});

export const setMatches = users => ({
	type: SET_MATCHES,
	users,
})

export const createMatch = user_id => ({
	type: CREATE_MATCH,
	user_id,
})

export const setMatchId = match_id => ({
	type: SET_MATCH_ID,
	match_id,
});

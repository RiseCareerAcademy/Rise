import axios from 'axios';
import { takeLatest, put, all, select } from 'redux-saga/effects';

import { GET_MATCHES, setMatches, CREATE_MATCH } from "../actions/matches.actions";
import { DOMAIN } from '../config/url';

export function* getMatches() {
	try {
		const skills = yield select(state => state.user.skills);
		const profession = yield select(state => state.user.profession);

		// TODO: do responses in parallel
		const skillsResponse = yield axios.get(`http://${DOMAIN}/user/skill/${skills}`);
		const { data: { rows: skillsUsers } } = skillsResponse;
		const skillsMentors = skillsUsers.map(user => user.users).filter(user => String(user)[0] === '1');
		
		const professionResponse = yield axios.get(`http://${DOMAIN}/user/profession/${profession}`);
		const { data: { rows: professionUsers } } = professionResponse;
		const professionMentors = professionUsers.map(user => user.users).filter(user => String(user)[0] === '1');

		const mentorsIds = {};
		for (let i = 0; i < professionMentors.length; i++) {
			mentorsIds[professionMentors[i]] = 2;
		}
		for (let i = 0; i < skillsMentors.length; i++) {
			if (mentorsIds[skillsMentors[i]] === undefined) {
				mentorsIds[skillsMentors[i]] = 0;
			}
			mentorsIds[skillsMentors[i]] += 1;
		}
		const getMentorsUrl = `http://${DOMAIN}/user/mentors?user_ids=${JSON.stringify(Object.keys(mentorsIds))}`;
		const mentorsResponse = yield axios.get(getMentorsUrl);
		let { data: { rows: mentors } } = mentorsResponse;
		mentors = mentors.map(mentor => {
			mentor.score = mentorsIds[mentor.user_id];
			return mentor;
		}).sort((a, b) => a.score < b.score)
		yield put(setMatches(mentors));
	} catch(e) {
        if (e.response !== undefined && e.response.data !== undefined) {
            const error = typeof e.response.data === 'string' ? e.response.data : e.response.data.error;
			console.error(error);
        } else {
            console.error(e.message);
        }
    }
}


export function* createMatch({ user_id }) {
	try {
		const mentee_id = yield select(state => state.user.user_id);
		const reqBody = {
			mentor_id: user_id,
			mentee_id,
			ratings: 0,
		}
		const matchApiUrl = `http://${DOMAIN}/match`;
		yield axios.post(matchApiUrl, reqBody);
		// const matchResponse = yield axios.get(`${matchApiUrl}/userid/${mentee_id}`);
		// const { data: { rows } } = matchResponse;
		// const matchObject = rows[0];

		alert('Successfully matched!');
	} catch(e) {
        if (e.response !== undefined && e.response.data !== undefined) {
            const error = typeof e.response.data === 'string' ? e.response.data : e.response.data.error;
            // console.error(error);
			alert(error);
        } else {
            console.error(e.message);
        }
    }
}

export default function* userSaga() {
    yield all([
		takeLatest(GET_MATCHES, getMatches),
		takeLatest(CREATE_MATCH, createMatch),
    ]);
}
import axios from 'axios';
import { takeLatest, put, all } from 'redux-saga/effects';

import { DOMAIN } from '../config/url';
import { GET_ALL_MENTORS, GET_ALL_MENTEES, setMentors, setMentees } from "../actions/users-search.actions";

export function* fetchAllMentors() {
	const { rows } = yield axios.get(`http://${DOMAIN}/user/mentor`)
	yield put(setMentors(rows));
	return rows;
}

export function* fetchAllMentees() {
	const { rows } = yield axios.get(`http://${DOMAIN}/user/mentee`)
	yield put(setMentees(rows));
	return rows;
}

export default function* userSearch() {
	yield all([
		takeLatest(GET_ALL_MENTORS, fetchAllMentors),
		takeLatest(GET_ALL_MENTEES, fetchAllMentors),
	]);
}

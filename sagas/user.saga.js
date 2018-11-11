import axios from 'axios';
import { GET_USER, setUser, REGISTER_MENTEE } from "../actions/user.actions";
import { takeLatest, put, all } from 'redux-saga/effects';
import { DOMAIN } from "../config/url";

export function* registerMentee({ mentee }) {
	yield axios.post(`http://${DOMAIN}/user/mentee`, mentee);
	yield put(setUser(mentee));
}

export function* getUser({ userId }) {
	const { rows } = yield axios.get(`http://${DOMAIN}/user/${userId}`);
	yield put(setUser(rows[0]))
	return rows;
}

export default function* userSaga() {
	yield all([
		takeLatest(GET_USER, getUser),
		takeLatest(REGISTER_MENTEE, registerMentee),
	]);
}

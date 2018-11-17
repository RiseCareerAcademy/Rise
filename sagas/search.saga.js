import axios from 'axios';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setMentors, GET_ALL_MENTORS, GET_ALL_MENTEES, setMentees } from '../actions/search.actions';
import { DOMAIN } from '../config/url';

export function* getAllMentors() {
	try {
        const response = yield axios.get(`http://${DOMAIN}/user/mentors`);
        const mentors =response.data.rows;
        yield put(setMentors(mentors));
        return mentors;

    } catch(e) {
        if (e.response !== undefined && e.response.data !== undefined) {
            const error = typeof e.response.data === 'string' ? e.response.data : e.response.data.error;
            console.error(error);
        } else {
            console.error(e.message);
        }
    }
}

export function* getAllMentees() {
	try {
        const response = yield axios.get(`http://${DOMAIN}/user/mentees`);
        const mentees =response.data.rows;
        yield put(setMentees(mentees));
        return mentees;

    } catch(e) {
        if (e.response !== undefined && e.response.data !== undefined) {
            const error = typeof e.response.data === 'string' ? e.response.data : e.response.data.error;
            console.error(error);
        } else {
            console.error(e.message);
        }
    }
}

export default function* searchSaga() {
    yield all([
        takeLatest(GET_ALL_MENTORS, getAllMentors),
        takeLatest(GET_ALL_MENTEES, getAllMentees),
    ]);
}
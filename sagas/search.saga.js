import axios from 'axios';
import { takeLatest, put, all } from 'redux-saga/effects';
import { setMentors, GET_ALL_MENTORS, GET_ALL_MENTEES, setMentees, GET_MENTOR } from '../actions/search.actions';
import { DOMAIN } from '../config/url';
import { NavigationActions } from 'react-navigation';

export function* getAllMentors() {
	try {
        const response = yield axios.get(`http://${DOMAIN}/user/mentors`);
        const mentors =response.data.rows;
        yield put(setMentors(mentors));
        return mentors;

    } catch (e) {
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

    } catch (e) {
        if (e.response !== undefined && e.response.data !== undefined) {
            const error = typeof e.response.data === 'string' ? e.response.data : e.response.data.error;
            console.error(error);
        } else {
            console.error(e.message);
        }
    }
}

export function* getMentor({ user_id }) {
    try {
        const response = yield axios.get(`http://${DOMAIN}/user/${user_id}`);
        const mentor = response.data.rows[0];
        yield put(NavigationActions.navigate({ routeName: 'MentorProfile', params: mentor }));
    } catch (e) {
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
        takeLatest(GET_MENTOR, getMentor),
        // takeLatest(GET_MENTEE, getMentee),
    ]);
}
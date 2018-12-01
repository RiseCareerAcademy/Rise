import axios from "axios";
import { takeLatest, put, all, select } from "redux-saga/effects";
import {
  setMentors,
  GET_ALL_MENTORS,
  GET_ALL_MENTEES,
  setMentees,
  GET_MENTOR,
  GET_MENTEE,
  setMatches,
  GET_ALL_MATCHES,
} from "../actions/search.actions";
import { HOST } from "../config/url";
import { NavigationActions } from "react-navigation";

export function* getAllMentors() {
  try {
    const response = yield axios.get(`http://${HOST}/user/mentors`);
    const mentors = response.data.rows;
    yield put(setMentors(mentors));
    return mentors;
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      console.error(error);
    } else {
      console.error(e.message);
    }
  }
}

export function* getAllMentees() {
  try {
    const response = yield axios.get(`http://${HOST}/user/mentees`);
    const mentees = response.data.rows;
    yield put(setMentees(mentees));
    return mentees;
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      console.error(error);
    } else {
      console.error(e.message);
    }
  }
}

export function* getAllMatches() {
  try {
    const user_id = yield select(state => state.user.user_id);
    const response = yield axios.get(`http://${HOST}/match/userid/${user_id}`);
    const matches = response.data.rows;
    const isMentor = user_id[0] === '1';
    let matchedUsers;
    if (isMentor) {
      matchedUsers = yield Promise.all(matches.map(async match => {
        const user_id_to_match = match.mentee_id;
        const menteeResponse = await axios.get(`http://${HOST}/user/${user_id_to_match}`);
        return menteeResponse.data.rows[0];
      }))
    } else {
      matchedUsers = yield Promise.all(matches.map(async match => {
        const user_id_to_match = match.mentor_id;
        const mentorResponse = await axios.get(`http://${HOST}/user/${user_id_to_match}`);
        return mentorResponse.data.rows[0];
      }))
    }
    yield put(setMatches(matchedUsers));
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      console.error(error);
    } else {
      console.error(e.message);
    }
  }
}

export function* getMentor({ user_id }) {
  try {
    const response = yield axios.get(`http://${HOST}/user/${user_id}`);
    const mentor = response.data.rows[0];
    yield put(
      NavigationActions.navigate({ routeName: "MentorProfile", params: mentor })
    );
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      console.error(error);
    } else {
      console.error(e.message);
    }
  }
}

export function* getMentee({ user_id }) {
  try {
    const response = yield axios.get(`http://${HOST}/user/${user_id}`);
    const mentee = response.data.rows[0];
    yield put(
      NavigationActions.navigate({ routeName: "MenteeProfile", params: mentee })
    );
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
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
    takeLatest(GET_ALL_MATCHES, getAllMatches),
    takeLatest(GET_MENTOR, getMentor),
    takeLatest(GET_MENTEE, getMentee),
  ]);
}

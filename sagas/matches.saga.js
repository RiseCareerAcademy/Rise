import axios from "axios";
import { takeLatest, put, all, select } from "redux-saga/effects";

import {
  GET_SUGGESTED_MENTOR_MATCHES,
  GET_SUGGESTED_MENTEE_MATCHES,
  setMatches,
  CREATE_MATCH,
} from "../actions/matches.actions";
import { HOST } from "../config/url";
import handleResponseError from "../utils/handleResponseError";

export function* getSuggestedMentorMatches() {
  try {
    const mentee_id = yield select(state => state.user.user_id);
    const mentorsResponse = yield axios.get(
      `http://${HOST}/match/mentors?mentee_id=${mentee_id}`
    );
    const { data: { rows: mentors } } = mentorsResponse;
    yield put(setMatches(mentors));
  } catch (e) {
    handleResponseError(e);
  }
}

export function* getSuggestedMenteeMatches() {
  try {
    const mentor_id = yield select(state => state.user.user_id);
    const menteesResponse = yield axios.get(
      `http://${HOST}/match/mentees?mentor_id=${mentor_id}`
    );
    const { data: { rows: mentees } } = menteesResponse;
    yield put(setMatches(mentees));
  } catch (e) {
    handleResponseError(e);
  }
}

export function* createMatch({ user_id: user_id_to_match }) {
  try {
    const user_id = yield select(state => state.user.user_id);
    const isMentor = user_id[0] === '1';
    const reqBody = {
      mentor_id: isMentor ? user_id : user_id_to_match,
      mentee_id: isMentor ? user_id_to_match : user_id,
      ratings: 0,
    };
    const matchApiUrl = `http://${HOST}/match`;
    yield axios.post(matchApiUrl, reqBody);
    // const matchResponse = yield axios.get(`${matchApiUrl}/userid/${mentee_id}`);
    // const { data: { rows } } = matchResponse;
    // const matchObject = rows[0];

    alert("Successfully matched!");
  } catch (e) {
    handleResponseError(e);
  }
}

// export function* hasMatch({ user_id: user_id_to_match }) {
//   try {
//     const user_id = yield select(state => state.user.user_id);
//     const match = yield
//   } catch(error) {
//     handleResponseError(error);
//   }
// }

export default function* userSaga() {
  yield all([
    takeLatest(GET_SUGGESTED_MENTOR_MATCHES, getSuggestedMentorMatches),
    takeLatest(GET_SUGGESTED_MENTEE_MATCHES, getSuggestedMenteeMatches),
    takeLatest(CREATE_MATCH, createMatch),
  ]);
}

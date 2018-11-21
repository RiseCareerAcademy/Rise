import { GET_MESSAGES, setMessages } from "../actions/messages.actions";
import { takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";
import { DOMAIN } from "../config/url";

export function* getMessages() {
  try {
    const user_id = yield select(state => state.user.user_id);
    const isMentor = String(user_id)[0] === 1;
    const response = yield axios.get(`http://${DOMAIN}/match/userid/${user_id}`);
    const {
      data: { rows: matches },
    } = response;
    const messages = yield all(
      matches.map(async match => {
        let otherUserId;
        if (isMentor) {
          otherUserId = match.mentee_id;
        } else {
          otherUserId = match.mentor_id;
        }

        const otherUserResponse = await axios.get(`http://${DOMAIN}/user/${otherUserId}`);
        const otherUser = otherUserResponse.data.rows[0];
        let message = {
          empty: true,
          match_id: match.match_id,
        };
        const messageResponse = await axios.get(`http://${DOMAIN}/user/message/${match.match_id}`);
        if (messageResponse.data.rows.length === 0) {
          return message;
        }
        message = {
          ...message,
          ...messageResponse.data.rows[0],
          empty: false,
          otherUser,
          otherUserId,
        };

        return message;
      })
    );
    yield put(setMessages(messages));
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error = typeof e.response.data === "string" ? e.response.data : e.response.data.error;
      console.error(error);
    } else {
      console.error(e.message);
    }
  }
}

export default function* messagesSaga() {
  yield all([takeLatest(GET_MESSAGES, getMessages)]);
}

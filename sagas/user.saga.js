import axios from 'axios';
import { GET_USER, setUser, REGISTER_MENTEE } from "../actions/user.actions";
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { DOMAIN } from "../config/url";

export function* uploadProfilePic( user_id, uri ) {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('photo', {
      uri,
      name: `${user_id}.${fileType}`,
      type: `image/${fileType}`,
    });
    const options = {
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
	  },
	  url: `http://${DOMAIN}/user/${user_id}/profilepic`,
    };
	yield axios(options);
}

export function* registerMentee({ mentee }) {
	try {
		yield axios.post(`http://${DOMAIN}/user/mentee`, mentee);
		yield call(uploadProfilePic, mentee.user_id, mentee.uri);
		yield put(setUser(mentee));
	} catch(e) {
		console.log(e.response.data.error);
	}
}

export function* getUser({ userId }) {
	const { rows } = yield axios.get(`http://${DOMAIN}/user/${userId}`);
	yield put(setUser(rows[0]));
	return rows;
}

export default function* userSaga() {
	yield all([
		takeLatest(GET_USER, getUser),
		takeLatest(REGISTER_MENTEE, registerMentee),
	]);
}

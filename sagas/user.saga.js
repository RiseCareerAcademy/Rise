import axios from 'axios';
import { GET_USER, setUser, REGISTER_MENTEE, UPLOAD_PROFILE_PIC, failedRegisterMentee, LOGOUT_USER } from "../actions/user.actions";
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { DOMAIN } from "../config/url";
import { NavigationActions } from 'react-navigation';

export function* uploadProfilePic({ user_id, uri }) {
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
    const { data } = yield axios(options);
    return data.profile_pic_URL;
}

export function* registerMentee({ mentee }) {
    try {
        const response = yield axios.post(`http://${DOMAIN}/user/mentee`, mentee);
        const { data } = response;
        yield call(uploadProfilePic, { user_id: data.mentee.user_id, uri: mentee.uri });
        yield put(setUser(data.mentee));
        yield put(NavigationActions.navigate({ routeName: "Main" }));
    } catch(e) { 
        const error = e.response.data.error;
        yield put(failedRegisterMentee(error));
    }
}

export function* getUser({ userId }) {
    const { rows } = yield axios.get(`http://${DOMAIN}/user/${userId}`);
    yield put(setUser(rows[0]));
    return rows;
}

export function* logoutUser() {
    yield put(NavigationActions.navigate({ routeName: 'Home' }));
}

export default function* userSaga() {
    yield all([
        takeLatest(GET_USER, getUser),
        takeLatest(REGISTER_MENTEE, registerMentee),
        takeLatest(UPLOAD_PROFILE_PIC, uploadProfilePic),
        takeLatest(LOGOUT_USER, logoutUser),
    ]);
}

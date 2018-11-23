import axios from "axios";
import {
  GET_USER,
  setUser,
  REGISTER_MENTEE,
  UPLOAD_PROFILE_PIC,
  failedRegisterMentee,
  LOGOUT_USER,
  REGISTER_WITH_LINKEDIN,
  setUserFields,
  REGISTER_MENTOR,
  failedRegisterMentor,
  LOGIN,
  failedLogin,
  UPDATE_USER
} from "../actions/user.actions";
import { takeLatest, put, all, call, select } from "redux-saga/effects";
import { DOMAIN } from "../config/url";
import { NavigationActions, StackActions } from "react-navigation";
import { LINKEDIN_CLIENT_ID } from "react-native-dotenv";
import uuidv1 from "uuid/v1";
import { AuthSession } from "expo";

export function* uploadProfilePic({ user_id, uri }) {
  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();
  formData.append("photo", {
    uri,
    name: `${user_id}.${fileType}`,
    type: `image/${fileType}`
  });
  const options = {
    method: "POST",
    data: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
    url: `http://${DOMAIN}/user/${user_id}/profilepic`
  };
  const { data } = yield axios(options);
  return data.profile_pic_URL;
}

export function* registerMentee({ mentee }) {
  try {
    yield axios.post(`http://${DOMAIN}/user/password`, {
      email_address: mentee.email_address,
      password: mentee.password
    });
    const response = yield axios.post(`http://${DOMAIN}/user/mentee`, {
      ...mentee,
      passwordHash: mentee.passwordHash
    });
    if (response === undefined) {
      throw Error(
        "Response is empty. Is the server started and running properly?"
      );
    }
    const { data } = response;
    if (!data.success) {
      throw Error(data.error);
    }
    yield call(uploadProfilePic, {
      user_id: data.mentee.user_id,
      uri: mentee.uri
    });
    yield put(setUser(data.mentee));
    yield put(NavigationActions.navigate({ routeName: "Main" }));
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      yield put(failedRegisterMentee(error));
    } else {
      yield put(failedRegisterMentee(e.message));
    }
  }
}

export function* registerMentor({ mentor }) {
  try {
    const passwordResponse = yield axios.post(
      `http://${DOMAIN}/user/password`,
      { email_address: mentor.email_address, password: mentor.password }
    );
    const { passwordHash } = passwordResponse;
    const response = yield axios.post(`http://${DOMAIN}/user/mentor`, {
      ...mentor,
      passwordHash,
      profile_pic_URL: mentor.image
    });
    const { data } = response;
    yield put(setUser(data.mentor));
    yield put(NavigationActions.navigate({ routeName: "Main" }));
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      yield put(failedRegisterMentor(error));
    } else {
      yield put(failedRegisterMentor(e.message));
    }
  }
}

export function* registerWithLinkedin() {
  // Setup params for Linkedin API
  // For more details: https://developer.linkedin.com/docs/oauth2
  const response_type = "code";
  const client_id = LINKEDIN_CLIENT_ID;
  const redirectUrl = AuthSession.getRedirectUrl();
  const state = uuidv1();
  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}` +
    `&client_id=${encodeURIComponent(client_id)}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    `&state=${encodeURIComponent(state)}`;

  // Use Expo's AuthSession to connect with the Linkedin API
  // For more details: https://i.expo.io/versions/latest/sdk/auth-session
  const result = yield AuthSession.startAsync({ authUrl });
  console.log(result);
  if (result.type === "cancel") {
    return;
  }

  const {
    params: { state: responseState, code }
  } = result;
  if (responseState !== state) {
    return;
  }

  yield put(StackActions.push({ routeName: "Loading" }));
  // // This only displays the results to the screen
  // this.setState({ result, authUrl, validState, responseState, state });
  try {
    const response = yield axios.post(`http://${DOMAIN}/user/linkedin`, {
      code,
      redirect_uri: redirectUrl
    });
    const {
      data: { fields }
    } = response;
    console.log(fields);
    yield put(setUserFields(fields));
    yield put(StackActions.pop());
    yield put(StackActions.push({ routeName: "Mentor" }));
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      // yield put(failedLogin(error));
      alert(error);
    } else {
      // yield put(failedLogin(e.message));
      alert(e.message);
    }
    yield put(StackActions.pop());
    yield put(StackActions.push({ routeName: "Home" }));
  }
}

export function* login({ email_address, password }) {
  try {
    const response = yield axios.post(`http://${DOMAIN}/user/login`, {
      email_address,
      password
    });
    const { user_id } = response.data.rows[0];
    const getUserResponse = yield axios.get(`http://${DOMAIN}/user/${user_id}`);
    const user = getUserResponse.data.rows[0];
    yield put(setUser(user));
    yield put(NavigationActions.navigate({ routeName: "Main" }));
    return user;
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      yield put(failedLogin(error));
    } else {
      yield put(failedLogin(e.message));
    }
  }
}

export function* getUser({ userId }) {
  try {
    const response = yield axios.get(`http://${DOMAIN}/user/${userId}`);
    const user = response.data.rows[0];
    yield put(setUser(user));
    return user;
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      alert(error);
    } else {
      alert(e.message);
    }
  }
}

export function* logoutUser() {
  yield put(NavigationActions.navigate({ routeName: "Home" }));
}

export function* updateUser({ user }) {
  const userApiMapping = {
    email_address: "email",
    hobbies: "hobbies",
    profile_pic_URL: "profilepic",
    profession: "profession",
    biography: "bio",
    zipcode: "zipcode",
    skills: "addskill"
  };

  const userId = yield select(state => state.user.user_id);

  try {
    yield all(
      Object.entries(user).map(([key, value]) => {
        const apiUrl = `http://${DOMAIN}/user/${userId}/${userApiMapping[key]}`;
        return axios.put(apiUrl, { [key]: value });
      })
    );
    yield getUser({ userId });
    alert("Successfully saved!");
    return user;
  } catch (e) {
    if (e.response !== undefined && e.response.data !== undefined) {
      const error =
        typeof e.response.data === "string"
          ? e.response.data
          : e.response.data.error;
      alert(error);
    } else {
      alert(e.message);
    }
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(GET_USER, getUser),
    takeLatest(REGISTER_MENTEE, registerMentee),
    takeLatest(REGISTER_MENTOR, registerMentor),
    takeLatest(REGISTER_WITH_LINKEDIN, registerWithLinkedin),
    takeLatest(UPLOAD_PROFILE_PIC, uploadProfilePic),
    takeLatest(LOGOUT_USER, logoutUser),
    takeLatest(LOGIN, login),
    takeLatest(UPDATE_USER, updateUser)
  ]);
}

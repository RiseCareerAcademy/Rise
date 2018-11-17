import { all } from 'redux-saga/effects';

// import conversation from './conversation.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';

export default function* rootSaga() {
  yield all([
    // conversation(),
    userSaga(),
    searchSaga(),
  ]);
}

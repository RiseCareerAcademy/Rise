import { all } from 'redux-saga/effects';

// import conversation from './conversation.saga';
import userSearch from './users-search.saga';
import userSaga from './user.saga';

export default function* rootSaga() {
  yield all([
    // conversation(),
    userSearch(),
    userSaga(),
  ]);
}

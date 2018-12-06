import { all } from 'redux-saga/effects';

import conversation from './conversation.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import matchesSaga from './matches.saga';
import messagesSaga from './messages.saga';

export default function* rootSaga() {
  yield all([
    conversation(),
    userSaga(),
    searchSaga(),
    matchesSaga(),
    messagesSaga(),
  ]);
}

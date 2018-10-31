import { all } from 'redux-saga/effects';

import messaging from './messaging.saga';

export default function* rootSaga() {
  yield all([
    messaging(),
  ]);
}

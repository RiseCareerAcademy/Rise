import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootSaga from './sagas';

import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware({ });

const middleware = [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export default () => {
  return { store, persistor };
};

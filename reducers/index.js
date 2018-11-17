import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import messagesReducer from "./messages.reducer";
import conversationReducer from "./conversation.reducer";
import userReducer from "./user.reducer";
import { navReducer } from '../navigation';
import searchReducer from "./search.reducer";

const authPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['registering', 'error', 'loggingIn'],
};

export default combineReducers({
  messages: messagesReducer,
  conversation: conversationReducer,
  user: persistReducer(authPersistConfig, userReducer),
  nav: navReducer,
  search: searchReducer,
});

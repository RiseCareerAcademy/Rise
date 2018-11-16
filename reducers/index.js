import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import messagesReducer from "./messages.reducer";
import conversationReducer from "./conversation.reducer";
import usersSearchReducer from "./users-search.reducer";
import userReducer from "./user.reducer";
import { navReducer } from '../navigation';

const authPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['registering', 'error', 'loggingIn'],
};

export default combineReducers({
  messages: messagesReducer,
  conversation: conversationReducer,
  usersSearch: usersSearchReducer,
  user: persistReducer(authPersistConfig, userReducer),
  nav: navReducer,
});

import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";
import { persistReducer } from 'redux-persist'

import messagesReducer from "./messages.reducer";
import conversationReducer from "./conversation.reducer";
import usersSearchReducer from "./users-search.reducer";
import userReducer from "./user.reducer";
import { navReducer } from '../navigation';

const authPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['error', 'loggeIn', 'registering'],
};

export default combineReducers({
  messages: messagesReducer,
  conversation: conversationReducer,
  usersSearch: usersSearchReducer,
  user: persistReducer(authPersistConfig, userReducer),
  nav: navReducer,
});

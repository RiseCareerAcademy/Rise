import { combineReducers } from 'redux';
import messagesReducer from './messages.reducer';
import conversationReducer from './conversation.reducer';
import usersSearchReducer from './users-search.reducer';
import userReducer from './user.reducer';

export default combineReducers({
	messages: messagesReducer,
	conversation: conversationReducer,
	usersSearch: usersSearchReducer,
	user: userReducer,
});
 
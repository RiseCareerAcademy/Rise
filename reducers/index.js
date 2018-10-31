import { combineReducers } from 'redux';
import messagesReducer from './messages.reducer';

export default combineReducers({
	messages: messagesReducer,
});

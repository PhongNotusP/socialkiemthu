import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import friendReducer from './friendReducer';
import roomReducer from './roomReducer';
export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    errors: errorReducer,
    post: postReducer,
    friend: friendReducer,
    room: roomReducer,
});
import { all, call, put, takeLatest } from 'redux-saga/effects';
import setAuthToken from '../utils/setAuthToken';
import RequestService from '../utils/requestService';
import jwt_decode from 'jwt-decode';
import cookieService from '../utils/cookieService';
import Message from '../utils/notificationMessage';
import * as types from '../actions/types';

//Login get User token
function* setCurrentUser(decoded) {
    yield put({ type: types.SET_CURRENT_USER, payload: decoded.data });
}

//Logout user
function* logoutUser() {
    //Remove token from cookie
    document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //Remove auth header for future requests
    window.location.reload();
    setAuthToken(false);
    //Set current user to {} which will set isAuthenticated to false
    yield call(setCurrentUser, {});
}

//User loading
function* setUserLoading() {
    yield put({ type: types.USER_LOADING });
}

//Clear Error
function* clearError() {
    yield put({ type: types.CLEAR_ERRORS })
}

//Login user
function* loginUser(data) {
    yield call(setUserLoading);
    yield call(clearError);
    try {
        const result = yield RequestService.post('/api/auth/login', data.data);
        const { token } = result.data;
        cookieService.setCookie('jwtToken', token, 3);
        //Set token to Auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        window.location.reload();
        yield call(setCurrentUser, decoded);
    } catch (error) {
        if (error.response.data.message) {
            Message.displayError(error.response.data.message);
        }
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

//Register user
function* registerUser(data) {
    yield call(setUserLoading);
    yield call(clearError);
    try {
        yield RequestService.post('/api/auth/register', data.data)
        yield call(loginUser, data);
    } catch (error) {
        if (error.response.data.message) {
            Message.displayError(error.response.data.message);
        }
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

export function* authSaga() {
    yield all([
        takeLatest(types.LOGOUT_USER, logoutUser),
        takeLatest(types.LOGIN_USER, loginUser),
        takeLatest(types.REGISTER_USER, registerUser),
        takeLatest(types.GET_CURRENT_USER, setCurrentUser),
    ])
}
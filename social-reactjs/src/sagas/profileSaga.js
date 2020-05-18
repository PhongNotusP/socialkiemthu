import { all, call, put, takeLatest } from 'redux-saga/effects';
import RequestService from '../utils/requestService';
import * as types from '../actions/types';
import Message from '../utils/notificationMessage';
//User loading
function* setProfileLoading() {
    yield put({ type: types.PROFILE_LOADING });
}

//Get Handle
function* setHandleUser() {
    try {
        const data = yield RequestService.get('/api/profile/handle');
        yield put({ type: types.SET_HANDLE, payload: data.data.data });
    } catch (error) {
        console.log(error.response);
    }
}

//Get profile
function* setProfileUser() {
    try {
        const data = yield RequestService.get('/api/profile');
        yield put({ type: types.SET_PROFILE, payload: data.data.data });
    } catch (error) {
        console.log(error.response);
    }
}

//Get profile
function* setProfileGuest(data) {
    try {
        const result = yield RequestService.get(`/api/profile/${data.id}`);
        yield put({ type: types.SET_PROFILE, payload: result.data.data });
    } catch (error) {
        console.log(error.response);
    }
}

function* updateProfileUser(data) {
    yield call(clearError);
    yield call(setProfileLoading);
    try {
        yield RequestService.post('/api/profile/information', data.data);
        Message.displaySuccess('Cập nhật thành công');
    } catch (error) {
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

function* updateSocialUser(data) {
    yield call(clearError);
    yield call(setProfileLoading);
    try {
        yield RequestService.post('/api/profile/social', data.data);
        Message.displaySuccess('Cập nhật thành công');
    } catch (error) {
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

function* removeEducationUser(id) {
    try {
        yield RequestService.del('/api/profile/education/' + id);
        Message.displaySuccess('Xóa thành công');
        yield call(setProfileUser);
    } catch (error) {
        console.log(error);
    }
}

function* removeExperienceUser(id) {
    try {
        yield RequestService.del('/api/profile/experience/' + id);
        Message.displaySuccess('Xóa thành công');
        yield call(setProfileUser);
    } catch (error) {
        console.log(error);
    }
}

function* createEducationUser(data) {
    yield call(clearError);
    try {
        yield RequestService.post('/api/profile/education', data.data);
        Message.displaySuccess('Thêm thành công');
        yield call(setProfileUser);
    } catch (error) {
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

function* createExperienceUser(data) {
    yield call(clearError);
    try {
        yield RequestService.post('/api/profile/experience', data.data);
        Message.displaySuccess('Thêm thành công');
        yield call(setProfileUser);
    } catch (error) {
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

//Clear Error
function* clearError() {
    yield put({ type: types.CLEAR_ERRORS })
}

export function* profileSaga() {
    yield all([
        takeLatest(types.GET_HANDLE, setHandleUser),
        takeLatest(types.GET_PROFILE, setProfileUser),
        takeLatest(types.GET_GUEST, setProfileGuest),
        takeLatest(types.UPDATE_PROFILE, updateProfileUser),
        takeLatest(types.UPDATE_SOCIAL, updateSocialUser),
        takeLatest(types.REMOVE_EDUCATION, removeEducationUser),
        takeLatest(types.REMOVE_EXPERIENCE, removeExperienceUser),
        takeLatest(types.CREATE_EDUCATION, createEducationUser),
        takeLatest(types.CREATE_EXPERIENCE, createExperienceUser)
    ])
}
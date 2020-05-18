import { all, call, put, takeLatest } from 'redux-saga/effects';
import RequestService from '../utils/requestService';
import * as types from '../actions/types';
import Message from '../utils/notificationMessage';
//Post loading
function* setPostLoading() {
    yield put({ type: types.POST_LOADING });
}

//Create data
function* createPost(data) {
    yield call(setPostLoading);
    yield call(clearError);
    try {
        const result = yield RequestService.post('/api/stories', data.data);
        const story = result.data.data.storyInfo;
        const user = result.data.data.author;
        const object = { ...story, author: user };
        yield put({ type: types.CREATE_POST_COMPLETE, payload: object });
    } catch (error) {
        yield put({ type: types.GET_ERRORS, payload: error.response.data });
    }
}

//Get post
function* getPosts() {
    yield call(setPostLoading);
    try {
        const data = yield RequestService.get('/api/stories');
        yield put({ type: types.SET_POSTS, payload: data.data.data });
    } catch (error) {
        console.log(error.response);
    }
}

function* removePost(data) {
    try {
        yield RequestService.del(`/api/stories/${data.id}`);
        yield put({ type: types.REMOVE_POST_COMPLETE, payload: data.id });
        Message.displaySuccess('Xóa thành công');
    } catch (error) {
        console.log(error);
    }
}

function* likePost(data) {
    try {
        yield RequestService.post(`/api/stories/like/${data.id}`);
        yield call(getPosts);
    } catch (error) {
        console.log(error);
    }
}

function* unlikePost(data) {
    try {
        yield RequestService.post(`/api/stories/dislike/${data.id}`);
        yield call(getPosts);
    } catch (error) {
        console.log(error);
    }
}

function* createComment(data) {
    try{
        yield RequestService.post('/api/comments', data.data);
        yield call(getPosts);
    } catch (error) {
        console.log(error);
    }
}

function* removeComment(data) {
    try {
        yield RequestService.del(`/api/comments/${data.id}`);
        yield call(getPosts);
        Message.displaySuccess('Xóa thành công');
    } catch (error) {
        console.log(error);
    }
}

function* likeComment(data) {
    try {
        yield RequestService.post(`/api/comments/like/${data.id}`);
        yield call(getPosts);
    } catch (error) {
        console.log(error);
    }
}

function* unlikeComment(data) {
    try {
        yield RequestService.post(`/api/comments/dislike/${data.id}`);
        yield call(getPosts);
    } catch (error) {
        console.log(error);
    }
}

//Clear Error
function* clearError() {
    yield put({ type: types.CLEAR_ERRORS })
}

export function* postSaga() {
    yield all([
        takeLatest(types.GET_POSTS, getPosts),
        takeLatest(types.CREATE_POST, createPost),
        takeLatest(types.REMOVE_POST, removePost),
        takeLatest(types.LIKE_POST, likePost),
        takeLatest(types.UNLIKE_POST, unlikePost),
        takeLatest(types.CREATE_COMMENT, createComment),
        takeLatest(types.REMOVE_COMMENT, removeComment),
        takeLatest(types.LIKE_COMMENT, likeComment),
        takeLatest(types.UNLIKE_COMMENT, unlikeComment),
    ])
}
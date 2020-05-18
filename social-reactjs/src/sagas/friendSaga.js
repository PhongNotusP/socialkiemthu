import { all, call, put, takeLatest } from 'redux-saga/effects';
import RequestService from '../utils/requestService';
import * as types from '../actions/types';
import Message from '../utils/notificationMessage';
//Post loading
function* setFriendLoading() {
    yield put({ type: types.FRIEND_LOADING });
}

//Get post
function* getFriends() {
    yield call(setFriendLoading);
    try {
        const data = yield RequestService.get('/api/friends');
        yield put({ type: types.SET_FRIENDS, payload: data.data.data });
    } catch (error) {
        console.log(error.response);
    }
}

function* addFriend(data) {
    try {
        yield RequestService.post(`/api/friends/add/${data.id}`);
        yield call(getFriends);
        Message.displaySuccess('Đã gửi lời mời kết bạn');
    } catch (error) {
        console.log(error);
    }
}

function* cancelFriend(data) {
    try {
        yield RequestService.del(`/api/friends/request/${data.id}`);
        yield call(getFriends);
        Message.displaySuccess('Đã hủy lời mời kết bạn');
    } catch (error) {
        console.log(error);
    }
}

function* acceptRequest (data) {
    try {
        yield RequestService.post(`/api/friends/accept/${data.id}`);
        yield call(getFriends);
        Message.displaySuccess('Đã chấp nhận lời mời kết bạn');
    } catch (error) {
        console.log(error);
    }
}

function* removeFriend (data) {
    try{
        yield RequestService.del(`/api/friends/${data.id}`);
        yield call(getFriends);
        Message.displaySuccess('Đã hủy bạn');
    } catch (error) {
        console.log(error);
    }
}

function* declineRequest (data) {
    try {
        yield RequestService.post(`/api/friends/decline/${data.id}`);
        yield call(getFriends);
        Message.displaySuccess('Đã từ chối lời mời kết bạn');
    } catch (error) {
        console.log(error);
    }
}

export function* friendSaga() {
    yield all([
        takeLatest(types.GET_FRIENDS, getFriends),
        takeLatest(types.SEND_REQUEST, addFriend),
        takeLatest(types.CANCEL_REQUEST, cancelFriend),
        takeLatest(types.ACCEPT_REQUEST, acceptRequest),
        takeLatest(types.DECLINE_REQUEST, declineRequest),
        takeLatest(types.REMOVE_FRIEND, removeFriend)
    ])
}
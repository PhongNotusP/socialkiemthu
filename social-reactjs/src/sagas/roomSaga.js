import { all, call, put, takeLatest } from 'redux-saga/effects';
import RequestService from '../utils/requestService';
import Message from '../utils/notificationMessage';
import { socket } from '../utils/socketService';
import * as types from '../actions/types';

function* setRoomLoading() {
    yield put({ type: types.ROOM_LOADING });
}

//Register user
function* createRoom(data) {
    try {
        yield RequestService.post('/api/messages/room', { id: data.data });
        Message.displaySuccess('Đã thêm vào danh sách trò chuyện');
    } catch (error) {
        console.log(error)
    }
}

//Fetch room
function* fetchRoom() {
    yield call(setRoomLoading);
    try {
        const result = yield RequestService.get('/api/messages/room');
        yield put({ type: types.FETCH_ROOM, payload: result.data.data });
    } catch (error) {
        console.log(error);
    }
}

//Get detail room
function* getRoom(data) {
    try {
        const result = yield RequestService.get(`/api/messages/room/${data.id}`);
        socket.emit('LEAVE_ROOM', data.join);
        socket.emit('CLIENT_ROOM', data.id);
        yield put({ type: types.GET_ROOM, payload: result.data.data });
        yield put({ type: types.LIVE_ROOM, payload: result.data.data._id });
    } catch (error) {
        console.log(error);
    }
}

function* postMessage(data) {
    try {
        const result = yield RequestService.post('/api/messages/', { idRoom: data.data.idRoom, message: data.data.content });
        socket.emit('CLIENT_MESSAGE', result.data.data);
    } catch (error) {
        console.log(error);
    }
}


export function* roomSaga() {
    yield all([
        takeLatest(types.CREATE_ROOM, createRoom),
        takeLatest(types.SHOW_ROOM, fetchRoom),
        takeLatest(types.DETAIL_ROOM, getRoom),
        takeLatest(types.POST_MESSAGES, postMessage)
    ])
}
import * as types from './types';

export function createRoom(data) {
    return { type: types.CREATE_ROOM, data }
}

export function getRoom(id, join) {
    return { type: types.DETAIL_ROOM, id, join }
}

export function getAllRoom() {
    return { type: types.SHOW_ROOM }
}

export function postMessage(data) {
    return { type: types.POST_MESSAGES, data }
}
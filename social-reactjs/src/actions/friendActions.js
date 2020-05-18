import * as types from './types';

export function getFriends() {
    return { type: types.GET_FRIENDS }
}

export function sendRequest(id) {
    return { type: types.SEND_REQUEST, id }
}

export function cancelRequest(id) {
    return { type: types.CANCEL_REQUEST, id }
}

export function acceptRequest(id) {
    return { type: types.ACCEPT_REQUEST, id }
}

export function declineRequest(id) {
    return { type: types.DECLINE_REQUEST, id }
}

export function removeFriend(id) {
    return { type: types.REMOVE_FRIEND, id }
}
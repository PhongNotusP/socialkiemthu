import * as types from './types';

export function getPosts() {
    return { type: types.GET_POSTS }
}

export function createPost(data) {
    return { type: types.CREATE_POST, data }
}

export function removePost(id) {
    return { type: types.REMOVE_POST, id }
}

export function likePost(id) {
    return { type: types.LIKE_POST, id }
}

export function unlikePost(id) {
    return { type: types.UNLIKE_POST, id }
}
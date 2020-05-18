import * as types from './types';

export function createComment(data) {
    return { type: types.CREATE_COMMENT, data }
}

export function removeComment(id) {
    return { type: types.REMOVE_COMMENT, id }
}

export function likeComment(id) {
    return { type: types.LIKE_COMMENT, id }
}

export function unlikeComment(id) {
    return { type: types.UNLIKE_COMMENT, id }
}
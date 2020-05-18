import * as types from './types';

export function loginUser(data) {
    return { type: types.LOGIN_USER, data };
}

export function registerUser(data) {
    return { type: types.REGISTER_USER, data };
}

export function logoutUser() {
    return { type: types.LOGOUT_USER };
}

export function setCurrentUser(data) {
    return { type: types.GET_CURRENT_USER, data }
}
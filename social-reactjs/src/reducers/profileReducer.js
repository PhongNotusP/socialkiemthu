import { SET_HANDLE, SET_PROFILE } from '../actions/types';
const initialState = {
    handle: null,
    profile: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_HANDLE:
            return {
                ...state,
                handle: action.payload,
                loading: false
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
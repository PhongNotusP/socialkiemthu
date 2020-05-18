import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';
import isEmpty from '../utils/isEmpty';
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
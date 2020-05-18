import {
    SET_FRIENDS,
    FRIEND_LOADING
} from "../actions/types";

const initialState = {
    people: {
        friends: [],
        incommingRequests: [],
        otherUsers: [],
        sentRequests: [],
    },
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FRIEND_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_FRIENDS:
            return {
                people: action.payload
            }
        default:
            return state;
    }
}
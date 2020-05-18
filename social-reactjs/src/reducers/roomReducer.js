import {
    FETCH_ROOM,
    ROOM_LOADING,
    LIVE_ROOM,
    GET_ROOM
} from "../actions/types";

const initialState = {
    rooms: [],
    live: {},
    room: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ROOM_LOADING:
            return {
                ...state,
                loading: true
            }
        case FETCH_ROOM:
            return {
                rooms: action.payload,
                loading: false
            }
        case LIVE_ROOM:
            return {
                ...state,
                live: action.payload,
                loading: false
            }
        case GET_ROOM:
            return {
                ...state,
                room: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
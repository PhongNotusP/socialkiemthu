import { 
    POST_LOADING,
    SET_POSTS,
    CREATE_POST_COMPLETE,
    REMOVE_POST_COMPLETE
} from "../actions/types";

const initialState = {
    posts: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case CREATE_POST_COMPLETE:
            return {
                ...state,
                loading: false,
                posts: [action.payload, ...state.posts]
            }
        case REMOVE_POST_COMPLETE:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state;
    }
}
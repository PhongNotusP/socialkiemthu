//Errors
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
//User - Actions
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
//User - Saga
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const USER_LOADING = 'USER_LOADING';

//Profile - Actions
export const GET_HANDLE = 'GET_HANDLE';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_GUEST = 'GET_GUEST';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_SOCIAL = 'UPDATE_SOCIAL';
export const CREATE_EDUCATION = 'CREATE_EDUCATION';
export const CREATE_EXPERIENCE = 'CREATE_EXPERIENCE';
export const REMOVE_EDUCATION = 'REMOVE_EDUCATION';
export const REMOVE_EXPERIENCE = 'REMOVE_EXPERIENCE';
//Profile - Saga
export const SET_HANDLE = 'SET_HANDLE';
export const SET_PROFILE = 'SET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';

//Post - Action
export const GET_POSTS = 'GET_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
//Post - Saga
export const SET_POSTS = 'SET_POSTS';
export const POST_LOADING = 'POST_LOADING';
export const CREATE_POST_COMPLETE = 'CREATE_POST_COMPLETE';
export const REMOVE_POST_COMPLETE = 'REMOVE_POST_COMPLETE';

//Comment - Action
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';

//Friend - Action
export const GET_FRIENDS = 'GET_FRIENDS';
export const SEND_REQUEST = 'SEND_REQUEST';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';
export const DECLINE_REQUEST = 'DECLINE_REQUEST';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
//Friend - Saga
export const SET_FRIENDS = 'SET_FRIENDS';
export const FRIEND_LOADING = 'FRIEND_LOADING';

//Chat - Action
export const CREATE_ROOM = 'CREATE_ROOM';
export const SHOW_ROOM = 'SHOW_ROOM';
export const DETAIL_ROOM = 'DETAIL_ROOM';
export const POST_MESSAGES = 'POST_MESSAGES';
//Chat - Saga
export const ROOM_LOADING = 'ROOM_LOADING';
export const FETCH_ROOM = 'FETCH_ROOM';
export const GET_ROOM = 'GET_ROOM';
export const LIVE_ROOM = 'LIVE_ROOM';
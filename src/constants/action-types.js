import createAsyncActionTypes from '../utils/createAsyncActionTypes';

export const FIREBASE_REQUEST = 'FIREBASE_REQUEST';

// AUTH
export const SIGN_UP = createAsyncActionTypes('SIGN_UP');
export const SIGN_IN = createAsyncActionTypes('SIGN_IN');
export const SIGN_OUT = createAsyncActionTypes('SIGN_OUT');
export const SET_USER = 'SET_USER';

// BOARD
export const ADD_BOARD = createAsyncActionTypes('ADD_BOARD');
export const DELETE_BOARD = createAsyncActionTypes('DELETE_BOARD');
export const GET_BOARD = createAsyncActionTypes('GET_BOARD');
export const GET_BOARD_INIT_STATE = 'GET_BOARD_INIT_STATE';

// BOARDS
export const GET_BOARDS = createAsyncActionTypes('GET_BOARDS');

// QUESTIONS
export const ADD_QUESTION = createAsyncActionTypes('ADD_QUESTION');
export const DELETE_QUESTION = createAsyncActionTypes('DELETE_QUESTION');
export const MAKE_LIKE = createAsyncActionTypes('MAKE_LIKE');

// NOTIFICATIONS
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// LISTENERS
export const INIT_LISTENERS = 'INIT_LISTENERS';
export const CLEAR_LISTENERS = 'CLEAR_LISTENERS';

// USERS
export const GET_ONLINE_USERS = createAsyncActionTypes('GET_ONLINE_USERS');

// LOADING
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

//RECENTLY VISITED PAGE
export const SET_DEFAULT_RECENTLY_VISITED_PAGE = 'SET_DEFAULT_RECENTLY_VISITED_PAGE';
export const SET_RECENTLY_VISITED_PAGE = 'SET_RECENTLY_VISITED_PAGE';
export const GET_RECENTLY_VISITED_PAGE = 'GET_RECENTLY_VISITED_PAGE';


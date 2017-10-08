import * as AT from '../constants/action-types'

export const signUp = (email, password) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.SIGN_UP
  },
  payload: {
    email,
    password
  }
});

export const signIn = (email, password) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.SIGN_IN
  },
  payload: {
    email,
    password
  }
});

export const signOut = () => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.SIGN_OUT
  },
  payload: {}
});

export const initListeners = (boardId) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.INIT_LISTENERS
  },
  payload: {
    boardId
  }
});

export const clearListeners = (boardId) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.CLEAR_LISTENERS
  },
  payload: {
    boardId
  }
});
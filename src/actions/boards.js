import * as AT from '../constants/action-types'

export const addBoard = (userEmail, title, tag, color) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.ADD_BOARD,
  },
  payload: {
    userEmail: userEmail,
    title: title,
    id: tag,
    color,
    questions: {}
  }
});

export const deleteBoard = (id) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.DELETE_BOARD,
  },
  payload: {
    id
  }
});

export const getBoards = () => {
  return ({
    type: AT.FIREBASE_REQUEST,
    meta: {
      nextActionType: AT.GET_BOARDS,
    },
    payload: {}
  });
};
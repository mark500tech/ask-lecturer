import uuid from 'uuid';
import * as AT from '../constants/action-types';

export const addQuestion = (userEmail, content, boardId) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.ADD_QUESTION,
  },
  payload: {
    userEmail,
    content,
    boardId,
    id: uuid(),
    likes: 0,
    usersMadeLike: []
  }
});

export const deleteQuestion = (id, boardId) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.DELETE_QUESTION,
  },
  payload: {
    id,
    boardId
  }
});


export const getBoard = (boardId) => {
  return ({
    type: AT.FIREBASE_REQUEST,
    meta: {
      nextActionType: AT.GET_BOARD,
    },
    payload: {
      boardId
    }
  });
};

export const makeLike = (id, likes, usersMadeLike, boardId) => ({
  type: AT.FIREBASE_REQUEST,
  meta: {
    nextActionType: AT.MAKE_LIKE,
  },
  payload: {
    id,
    likes,
    usersMadeLike,
    boardId
  }
});

export const getBoardInitState = () => {
  return ({
    type: AT.GET_BOARD_INIT_STATE,
    payload: {}
  });
};
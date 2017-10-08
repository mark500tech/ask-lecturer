import {get} from 'lodash';

import FB from '../firebase/firebase';

import * as AT from '../constants/action-types';
import {setLoadingStatus} from "../actions/status";

const FirebaseMiddleware = (store) => {
  const FBInstance = new FB({
    dispatch: store.dispatch
  });

  return next => action => {
    if (action.type !== AT.FIREBASE_REQUEST) {
      return next(action);
    }

    const currentActionType = action.meta.nextActionType;

    if (get(currentActionType, 'PENDING')) {
      store.dispatch({type: currentActionType.PENDING});
    }

    switch (currentActionType) {
      case AT.SIGN_UP:
        FBInstance.signup(action.payload);
        break;

      case AT.SIGN_IN:
        FBInstance.signin(action.payload);
        break;

      case AT.SIGN_OUT:
        FBInstance.signout();
        break;

      case AT.ADD_BOARD:
        FBInstance.add(`boards/${action.payload.id}`, action.payload);
        break;

      case AT.DELETE_BOARD:
        FBInstance.delete(`boards/${action.payload.id}`);
        break;

      case AT.GET_BOARDS:
        store.dispatch(setLoadingStatus(true));

        FBInstance.get('boards', AT.GET_BOARDS);
        break;

      case AT.ADD_QUESTION:
        store.dispatch({type: AT.ADD_QUESTION.PENDING});

        FBInstance.add(`boards/${action.payload.boardId}/questions/${action.payload.id}`,
          action.payload);
        break;

      case AT.DELETE_QUESTION:
        FBInstance.delete(`boards/${action.payload.boardId}/questions/${action.payload.id}`);
        break;

      case AT.GET_BOARD:
        store.dispatch(setLoadingStatus(true));

        FBInstance.get(`boards/${action.payload.boardId}`, AT.GET_BOARD);
        break;

      case AT.MAKE_LIKE:
        FBInstance.edit({
          id: action.payload.id,
          likes: action.payload.likes,
          boardId: action.payload.boardId,
          usersMadeLike: action.payload.usersMadeLike
        });
        break;

      case AT.INIT_LISTENERS:
        FBInstance.initListeners(action.payload.boardId);
        break;

      case AT.CLEAR_LISTENERS:
        FBInstance.clearListeners(action.payload.boardId);
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default FirebaseMiddleware;
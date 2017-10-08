import {handleActions} from 'redux-actions';
import {set, unset, flow} from 'lodash/fp';
import * as AT from '../constants/action-types';

const initialState = {
  questions: {}
};

const board = handleActions({
  [AT.ADD_QUESTION.SUCCESS]: (state, action) => {
    let cardId = action.payload.id;

    return set(['questions', cardId], action.payload, state);
  },

  [AT.DELETE_QUESTION.SUCCESS]: (state, action) => unset(['questions', action.payload], state),

  [AT.MAKE_LIKE.SUCCESS]: (state, action) => {
    let cardId = action.payload.id;

    return flow([
      set(['questions', `${cardId}`, 'likes'], action.payload.likes),
      set(['questions', `${cardId}`, 'usersMadeLike'], action.payload.usersMadeLike)
    ])(state);
  },

  [AT.GET_BOARD_INIT_STATE]: (state, action) => initialState,

  [AT.GET_BOARD.SUCCESS]: (state, action) => action.payload
}, initialState);

export default board;
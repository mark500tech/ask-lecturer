import {handleActions} from 'redux-actions';
import {set, unset, flow} from 'lodash/fp'

import * as AT from '../constants/action-types'

const initialState = {};

const boards = handleActions({
  [AT.ADD_BOARD.SUCCESS]: (state, action) => {
    let cardId = action.payload.id;

    return set(cardId, action.payload, state);
  },

  [AT.DELETE_BOARD.SUCCESS]: (state, action) => unset(action.payload, state),

  [AT.GET_BOARDS.SUCCESS]: (state, action) => action.payload
}, initialState);

export default boards;
import {handleActions} from 'redux-actions';

import * as AT from '../constants/action-types'

const initialState = {
  isShown: false,
  text: '',
  type: ''
};

const notification = handleActions({
  [AT.SHOW_NOTIFICATION]: (state, action) => action.payload,

  [AT.HIDE_NOTIFICATION]: (state, action) => initialState
}, initialState);

export default notification;
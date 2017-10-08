import { handleActions } from 'redux-actions';

import * as AT from '../constants/action-types'

const initialState = {
  email: 'guest'
};

const userReducer = handleActions({
  [AT.SET_USER]: (state, action) => action.payload.user,

  [AT.SIGN_OUT.SUCCESS]: (state, action) => initialState
}, initialState);

export default userReducer;
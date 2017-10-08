import {handleActions} from 'redux-actions';

import * as AT from '../constants/action-types'

const initialState = {};

const usersOnline = handleActions({
  [AT.GET_ONLINE_USERS.SUCCESS]: (state, action) => action.payload
}, initialState);

export default usersOnline;
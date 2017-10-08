import {handleActions} from 'redux-actions';
import * as AT from '../constants/action-types';

const initialState = {
  status: false,
  counter: 0
};

const status = handleActions({
  [AT.SET_LOADING_STATUS]: (state, action) => {
    let newStatus = state.status;
    let newCounter = state.counter;

    if (action.payload.status) {
      newCounter++;
      newStatus = true;
    } else if (newCounter > 0){
      newCounter--;
    }

    if (newCounter === 0) {
      newStatus = false;
    }

    return {
      status: newStatus,
      counter: newCounter
    }
  }
}, initialState);

export default status;
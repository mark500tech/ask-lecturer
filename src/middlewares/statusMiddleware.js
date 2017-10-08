import {setLoadingStatus} from "../actions/status";
import * as AT from "../constants/action-types";

const StatusMiddleware = store => next => action => {
  switch (action.type) {
    case AT.GET_BOARD.SUCCESS:
      store.dispatch(setLoadingStatus(false));
      break;

    case AT.GET_BOARDS.SUCCESS:
      store.dispatch(setLoadingStatus(false));
      break;

    case AT.SIGN_IN.SUCCESS:
      store.dispatch(setLoadingStatus(false));
      break;

    case AT.SIGN_UP.SUCCESS:
      store.dispatch(setLoadingStatus(false));
      break;

    default:
      break;
  }

  return next(action);
};

export default StatusMiddleware;
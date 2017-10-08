import * as AT from '../constants/action-types'

export const setLoadingStatus = (status) => ({
  type: AT.SET_LOADING_STATUS,
  payload: {
    status
  }
});
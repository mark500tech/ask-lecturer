import * as AT from '../constants/action-types'

export const showNotification = (type, text) => ({
  type: AT.SHOW_NOTIFICATION,
  payload: {
    type,
    text,
    isShown: true
  }
});

export const hideNotification = () => ({
  type: AT.HIDE_NOTIFICATION,
  payload: {}
});
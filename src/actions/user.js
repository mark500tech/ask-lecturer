import * as AT from '../constants/action-types'

export const setUser = (user) => ({
  type: AT.SET_USER,
  payload: {
    user: user
  }
});
import {
  USER_AUTH_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants'

export const userReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case USER_AUTH_REQUEST: {
      return { loading: true, userData: {}, authenticated: false }
    }
    case USER_AUTH_SUCCESS: {
      return { loading: false, userData: action.payload, authenticated: true }
    }
    case USER_AUTH_FAIL: {
      return {
        loading: false,
        userData: {},
        error: action.payload,
        authenticated: false,
      }
    }
    case USER_LOGOUT: {
      return { loading: false, userData: {}, authenticated: false }
    }
    default: {
      return state
    }
  }
}

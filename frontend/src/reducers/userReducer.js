import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const userReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST: {
      return { loading: true, userData: {}, authenitaced: false }
    }
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS: {
      return { loading: false, userData: action.payload, authenitaced: false }
    }
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL: {
      return {
        loading: false,
        userData: {},
        error: action.payload,
        authenitaced: false,
      }
    }
    case USER_LOGOUT: {
      return { loading: false, userData: {}, authenitaced: false }
    }
    default: {
      return state
    }
  }
}

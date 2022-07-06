import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'
import AuthService from '../services/authService'

export class userActions {
  static login = (email, password) => async dispatch => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST })

      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)

      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.user })
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response?.data?.message || error.message,
      })
    }
  }

  static register = (email, password) => async dispatch => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const response = await AuthService.register(email, password)
      localStorage.setItem('token', response.data.accessToken)

      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.user })
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response?.data?.message || error.message,
      })
    }
  }

  static logout = () => async dispatch => {
    try {
      dispatch({ type: USER_LOGOUT })
      localStorage.removeItem('token')
      await AuthService.logout()
    } catch (error) {
      console.log(error)
    }
  }
}

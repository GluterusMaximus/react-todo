import userService from '../services/userService.js'

/* eslint-disable */
class UserController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.register(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        secure: true,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      console.log(error)
    }
  }
  login(req, res, next) {
    try {
    } catch (error) {}
  }
  logout(req, res, next) {
    try {
    } catch (error) {}
  }
  activate(req, res, next) {
    try {
    } catch (error) {}
  }
  refresh(req, res, next) {
    try {
    } catch (error) {}
  }
  getUsers(req, res, next) {
    try {
      res.json(['123', '456'])
    } catch (error) {}
  }
}

export default new UserController()

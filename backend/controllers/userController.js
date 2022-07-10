import userService from '../services/userService.js'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/apiError.js'

/* eslint-disable */
class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Invalid registration data', errors.array())
        )
      }

      const { email, password } = req.body
      const userData = await userService.register(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Invalid login data', errors.array()))
      }

      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (error) {}
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()

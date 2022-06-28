/* eslint-disable */
import User from '../models/userModel.js'
import { v4 } from 'uuid'
import mailService from './mailService.js'
import tokenService from './tokenService.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiError.js'

class UserService {
  async register(email, password) {
    const userExists = await User.findOne({ email })

    if (userExists) {
      throw ApiError.BadRequest('User already exists')
    }
    const activationLink = v4()
    const user = await User.create({ email, password, activationLink })
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

export default new UserService()

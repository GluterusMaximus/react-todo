/* eslint-disable */
import User from '../models/userModel.js'
import uuid from 'uuid'
import mailService from './mailService.js'
import tokenService from './tokenService.js'
import UserDto from '../dtos/userDto.js'

class UserService {
  async register(email, password) {
    const userExists = User.findOne({ email })

    if (userExists) {
      throw new Error('User already exists')
    }
    const activationLink = uuid.v4()

    const user = await User.create({ email, password, activationLink })
    await mailService.sendActivationMail(email, activationLink)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

export default new UserService()

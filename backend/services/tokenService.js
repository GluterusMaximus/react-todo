import jwt from 'jsonwebtoken'
import Token from '../models/tokenModel.js'

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    }
    return await Token.create({ refreshToken, user: userId })
  }

  async removeToken(refreshToken) {
    return await Token.deleteOne({ refreshToken })
  }

  async findToken(refreshToken) {
    return await Token.findOne({ refreshToken })
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()

import { Schema, model } from 'mongoose'

const tokenSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Token = model('Token', tokenSchema)

export default Token

import ApiError from '../exceptions/apiError.js'

//eslint-disable-next-line
export default function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }

  return res.status(500).json({ message: 'An unknown error occurred' })
}
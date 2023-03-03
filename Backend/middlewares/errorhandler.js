const {CustomAPIError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPIError ) {
    return res.status(err.statusCode).json({msg:err.message})
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'FAILED',
    msg: 'Something went wrong, please try again',
    error:err.message
  })
}

module.exports = errorHandlerMiddleware

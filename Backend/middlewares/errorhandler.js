const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: 'Something went wrong, please try again',err:err.message })
}

module.exports = errorHandlerMiddleware

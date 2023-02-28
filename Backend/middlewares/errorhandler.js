const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    status: 'FAILED',
    msg: 'Something went wrong, please try again',
    error: err.message
  })
}

module.exports = errorHandlerMiddleware

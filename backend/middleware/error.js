const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  //wrong mongodb id error
  if (err.name === `CastError`) {
    const message = `resource not found.invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error authentication one
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === `JsonWebTokenError`) {
    const message = `jason web token is invalid`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt expire error
  if (err.name === `TokenExpiredError`) {
    const message = `jason web token is expired`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack, // .stack is optional it is used for getting location of error
  });
};

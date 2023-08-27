const errorHandler = (err, req, res, next) => {
  if (err.code == 11000) {
    err.statusCode = 400;
    err.message = `${JSON.stringify(err.keyValue)} is already registered`;
  }
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      return res.status(err.statusCode).json(err.message);
    } else {
      return res.status(500).json("Something went wrong");
    }
  }
};

export default errorHandler;

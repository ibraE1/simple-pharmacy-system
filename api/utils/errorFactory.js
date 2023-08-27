// const errorFactory = (statusCode, message) => {
//   return { statusCode, message };
// };

// export default errorFactory;

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

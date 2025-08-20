const { ApiError, NotFoundError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  const errorData =
    process.env.NODE_ENV === "development"
      ? { STACK: err.stack, ERROR_TYPE: err.name }
      : null;

  return responseHandler(res, statusCode, message, errorData, true);
};

module.exports = errorHandler;

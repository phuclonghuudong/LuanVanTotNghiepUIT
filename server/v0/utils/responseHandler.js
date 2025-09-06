const responseHandler = (
  res,
  statusCode = 200,
  message = "",
  data = null,
  isError = false
) => {
  return res.status(statusCode).json({
    CODE: `${statusCode}${statusCode}`,
    SUCCESS: !isError,
    ERROR: isError,
    MESSAGE: message,
    DATA: data,
  });
};

module.exports = responseHandler;

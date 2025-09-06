class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

class UnprocessableEntityError extends ApiError {
  constructor(message = "Unprocessable Entity") {
    super(422, message);
  }
}

class TooManyRequestsError extends ApiError {
  constructor(message = "Too Many Requests") {
    super(429, message);
  }
}

class ServiceUnavailableError extends ApiError {
  constructor(message = "Service Unavailable") {
    super(503, message);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  ConflictError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  UnprocessableEntityError,
  TooManyRequestsError,
  ServiceUnavailableError,
};

// BadRequestError  	400	  Dữ liệu đầu vào sai
// UnauthorizedError	401	  Thiếu xác thực (chưa đăng nhập)
// ForbiddenError	    403	  Có xác thực nhưng không có quyền
// NotFoundError	    404	  Không tìm thấy tài nguyên
// ConflictError	    409	  Xung đột dữ liệu (slug trùng, email đã tồn tại, ...)
// UnprocessableEntityError	422	  Dữ liệu hợp lệ cú pháp nhưng sai logic
// TooManyRequestsError	    429	  Quá giới hạn request
// InternalServerError	    500	  Lỗi không xác định
// ServiceUnavailableError	503	  Server quá tải, bảo trì, dịch vụ phụ bị down

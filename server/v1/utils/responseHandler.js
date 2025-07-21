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
const successHandler = (res, statusCode = 200, message, data = null) => {
  return res.status(statusCode).json({
    CODE: `${statusCode + "" + statusCode}`,
    MESSAGE: message,
    ERROR: false,
    SUCCESS: true,
    DATA: data,
  });
};

const errorHandler = (res, statusCode = 500, message, data = null) => {
  return res.status(statusCode).json({
    CODE: `${statusCode + "" + statusCode}`,
    MESSAGE: message,
    ERROR: true,
    SUCCESS: false,
    DATA: data,
  });
};

module.exports = { successHandler, errorHandler, responseHandler };

// 200	OK	          Lấy dữ liệu thành công, đăng nhập thành công, cập nhật thành công
// 201	Created	      Tạo mới tài khoản, nhân viên, phân quyền, v.v.
// 204	No Content	  Xóa thành công, không cần trả dữ liệu
// 400	Bad Request	  Dữ liệu không hợp lệ, thiếu trường, JSON sai
// 401	Unauthorized	Chưa đăng nhập, token không hợp lệ
// 403	Forbidden	    Đã đăng nhập nhưng không có quyền (VD: role user vào admin)
// 404	Not Found	    Không tìm thấy nhân viên, tài khoản, endpoint sai
// 409	Conflict	    Đăng ký tài khoản bị trùng, email/username đã tồn tại
// 422	Unprocessable Entity	Dữ liệu đúng format nhưng logic sai (VD: sai mật khẩu cũ khi đổi mật khẩu)
// 500	Internal Server Error	Lỗi hệ thống, lỗi Prisma không bắt được, lỗi bất ngờ

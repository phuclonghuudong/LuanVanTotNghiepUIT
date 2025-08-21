const { BadRequestError } = require("../utils/errors");
const AuthCustomerBUS = require("../services/authCustomer.service");
const responseHandler = require("../utils/responseHandler");
const {
  generateAndSetToken,
  verifyRefreshToken,
} = require("../utils/token.util");

const payloadToken = async (data) => {
  const payload = {
    account: data?.accountId,
    user: data?.customerId,
    role: data?.role,
    username: data?.username,
    fullname: data?.fullname,
  };
  return payload;
};

const signUpCustomer = async (req, res, next) => {
  const { fullname, username, phone, email, password, confirmPassword } =
    req.body;
  if (
    !fullname.trim() ||
    !username.trim() ||
    !phone.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  )
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  if (password !== confirmPassword)
    throw new BadRequestError("MẬT KHẨU NHẬP LẠI KHÔNG ĐÚNG");

  try {
    const valueInput = req.body;
    const result = await AuthCustomerBUS.signUpCustomer(valueInput);

    const payload = await payloadToken(result);

    const { accessToken, refreshToken } = await generateAndSetToken(
      res,
      payload
    );

    const accountId = result?.accountId;

    await AuthCustomerBUS.refreshToken({
      id: accountId,
      token: refreshToken,
    });

    responseHandler(res, 200, "ĐĂNG KÝ NGƯỜI DÙNG THÀNH CÔNG", {
      USER: result,
      TOKEN: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const signInCustomer = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const validInput = req.body;
    const result = await AuthCustomerBUS.signInCustomer(validInput);

    const payload = await payloadToken(result);

    const { accessToken, refreshToken } = await generateAndSetToken(
      res,
      payload
    );

    const accountId = result?.accountId;

    await AuthCustomerBUS.refreshToken({
      id: accountId,
      token: refreshToken,
    });

    responseHandler(res, 200, "ĐĂNG NHẬP THÀNH CÔNG", {
      USER: result,
      TOKEN: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmailForgotPasswordCustomer = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await AuthCustomerBUS.verifyEmailForgotPasswordCustomer(
      email
    );

    responseHandler(res, 200, "VUI LÒNG XEM HỘP THƯ CỦA BẠN");
  } catch (error) {
    next(error);
  }
};

const verifyOtpByEmail = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email?.trim() || !otp?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  if (otp.length !== 6)
    throw new BadRequestError("MÃ OTP CHƯA HỢP LỆ. VUI LÒNG KIỂM TRA LẠI");

  try {
    const payload = req.body;
    const result = await AuthCustomerBUS.verifyOtpByEmail(payload);

    responseHandler(
      res,
      200,
      "XÁC NHẬN OTP THÀNH CÔNG. VUI LÒNG ĐỔI MẬT KHẨU",
      result
    );
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { password, confirmPassword, email } = req.body;

  if (!email?.trim() || !password?.trim() || !confirmPassword?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  if (password !== confirmPassword)
    throw new BadRequestError("MẬT KHẨU NHẬP LẠI KHÔNG ĐÚNG");

  try {
    const payload = req.body;
    const result = await AuthCustomerBUS.resetPassword(payload);

    responseHandler(res, 200, "ĐỔI MẬT KHẨU THÀNH CÔNG");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) throw new BadRequestError("VUI LÒNG ĐĂNG NHẬP");

    const verifyToken = await verifyRefreshToken(token);
    if (!verifyToken) throw new BadRequestError("TÀI KHOẢN KHÔNG HỢP LỆ");

    const accountId = verifyToken?.account;

    const checkUser = await AuthCustomerBUS.checkAccountAndCustomer(accountId);

    const payload = await payloadToken(checkUser);

    const { accessToken, refreshToken } = await generateAndSetToken(
      res,
      payload
    );

    await AuthCustomerBUS.refreshToken({
      id: accountId,
      token: refreshToken,
    });

    responseHandler(res, 200, "THAO TÁC THÀNH CÔNG", {
      // USER: checkUser,
      TOKEN: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const profileAccountCustomer = async (req, res, next) => {
  try {
    const user = req.user?.account;

    const result = await AuthCustomerBUS.checkAccountAndCustomer(user);

    responseHandler(res, 200, "THÔNG TIN TÀI KHOẢN", { USER: result });
  } catch (error) {
    next();
  }
};

const editInfoCustomer = async (req, res, next) => {
  const {
    fullname,

    username,
    email,
    phone,
    gender,
    birthday,
    address,
    avatar,
  } = req.body;
  if (!fullname.trim() || !username.trim() || !phone.trim() || !email.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const user = req.user?.user;
    const account = req.user?.account;
    const result = await AuthCustomerBUS.editInfoCustomer(
      user,
      account,
      req.body
    );

    responseHandler(res, 200, "THÔNG TIN TÀI KHOẢN", { USER: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpCustomer,
  signInCustomer,
  verifyEmailForgotPasswordCustomer,
  verifyOtpByEmail,
  resetPassword,
  refreshToken,
  profileAccountCustomer,
  editInfoCustomer,
};

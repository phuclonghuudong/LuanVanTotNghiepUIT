const AccountDAO = require("../repositories/account.repository");
const RoleBUS = require("../services/role.service");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");
const generateOtp = require("../utils/generateOtp");
const {
  validEmailInput,
  validPhoneInput,
  hashPassword,
  validPasswordInput,
  validUsernameInput,
} = require("../utils/isValidateInput");

class AccountBUS {
  async getAllAccounts() {
    const result = await AccountDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");
    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAccountById(id) {
    const result = await AccountDAO.findById(Number(id));
    if (!result || result.length == 0)
      throw new NotFoundError("TÀI KHOẢN KHÔNG TỒN TẠI DỮ LIỆU");
    return result.toJSON?.() ?? result;
  }

  async getAccountByUsername(value) {
    const result = await AccountDAO.findByUsername(value);
    if (!result || result.length === 0)
      throw new NotFoundError("TÀI KHOẢN KHÔNG TỒN TẠI");
    return result.toJSON?.() ?? result;
  }

  async getAccountByEmail(value) {
    const result = await AccountDAO.findByEmail(value);
    if (!result || result.length === 0)
      throw new NotFoundError("EMAIL KHÔNG TỒN TẠI");
    return result.toJSON?.() ?? result;
  }

  async getAccountByPhone(value) {
    const result = await AccountDAO.findByPhone(value);
    if (!result || result.length == 0)
      throw new NotFoundError("SỐ ĐIỆN THOẠI KHÔNG TỒN TẠI");
    return result.toJSON?.() ?? result;
  }

  async getAccountByIdentifier(value) {
    const result = await AccountDAO.findByIdentifier(value);
    if (!result || result.length === 0)
      throw new NotFoundError("TÀI KHOẢN KHÔNG TỒN TẠI");
    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { username, phone, email, password } = data;

    const isValidUsername = await validUsernameInput(username);
    const isValidPhone = await validPhoneInput(phone);
    const isValidEmail = await validEmailInput(email);
    const isValidPassword = await validPasswordInput(password);

    if (!isValidUsername)
      throw new BadRequestError("TÊN ĐĂNG NHẬP ÍT NHẤT 6 KÍ TỰ");
    if (!isValidPhone)
      throw new BadRequestError("SỐ ĐIỆN THOẠI KHÔNG ĐÚNG ĐỊNH DẠNG");
    if (!isValidEmail) throw new BadRequestError("EMAIL KHÔNG ĐÚNG ĐỊNH DẠNG");
    if (!isValidPassword)
      throw new BadRequestError(
        "MẬT KHẨU ÍT NHẤT 8 KÍ TỰ, BAO GỒM CHỮ HOA_THƯỜNG & SỐ & KÍ TỰ ĐẶC BIỆT"
      );

    const [existingUsername, existingPhone, existingEmail] = await Promise.all([
      AccountDAO.findByUsername(username),
      AccountDAO.findByPhone(phone),
      AccountDAO.findByEmail(email),
    ]);
    if (existingUsername) throw new ConflictError("TÀI KHOẢN ĐÃ ĐƯỢC SỬ DỤNG");
    if (existingPhone) throw new ConflictError("SỐ ĐIỆN THOẠI ĐÃ ĐƯỢC SỬ DỤNG");
    if (existingEmail) throw new ConflictError("EMAIL ĐÃ ĐƯỢC SỬ DỤNG");
  }

  async validateForUpdate(id, data) {
    const { username, phone, email, password } = data;

    const isValidEmail = await validEmailInput(email);
    const isValidPhone = await validPhoneInput(phone);
    const isValidPassword = await validPassword(password);

    if (!isValidEmail) throw new BadRequestError("EMAIL KHÔNG ĐÚNG ĐỊNH DẠNG");
    if (!isValidPhone)
      throw new BadRequestError("SỐ ĐIỆN THOẠI KHÔNG ĐÚNG ĐỊNH DẠNG");
    if (!isValidPassword)
      throw new BadRequestError(
        "MẬT KHẨU PHẢI ÍT NHẤT 8 KÍ TỰ BAO GỒM CHỮ (HOA & THƯỜNG) & SỐ & KÍ TỰ ĐẶC BIỆT"
      );

    const [existingUsername, existingPhone, existingEmail] = await Promise.all([
      AccountDAO.findByUsername(username),
      AccountDAO.findByPhone(phone),
      AccountDAO.findByEmail(email),
    ]);

    if (existingUsername && Number(existingUsername.account_id) !== Number(id))
      throw new ConflictError("TÀI KHOẢN ĐÃ TỒN TẠI");
    if (existingPhone && Number(existingPhone.account_id) !== Number(id))
      throw new ConflictError("SỐ ĐIỆN THOẠI ĐÃ TỒN TẠI");
    if (existingEmail && Number(existingEmail.account_id) !== Number(id))
      throw new ConflictError("EMAIL ĐÃ TỒN TẠI");
  }

  async createAccount(data) {
    const { role } = data;
    const checkRole = await RoleBUS.getRoleBySlug(role);

    await this.validateForCreate(data);

    const isValidPassword = await hashPassword(data.password);

    const result = await AccountDAO.create({
      ...data,
      roleId: checkRole.id,
      password: isValidPassword,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateAccount(id, data) {
    const isValidPassword = await hashPassword(data.password);

    const oldData = await this.getAccountById(Number(id));

    const isChanged =
      oldData.username === data.username &&
      oldData.phone === data.phone &&
      oldData.password === data.password &&
      oldData.email === data.email &&
      Number(oldData.status) === Number(data.status);

    if (!isChanged) throw new ConflictError("DỮ LIỆU KHÔNG CÓ GÌ THAY ĐỔI");

    await this.validateForUpdate(id, data);

    const result = await AccountDAO.update(Number(id), {
      ...data,
      password: isValidPassword,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateVerifyEmailForgotPassword(email) {
    const newOtp = await generateOtp();
    const expireTime = new Date(Date.now() + 3 * 60 * 1000);
    const checkAccount = await this.getAccountByEmail(email);

    const accountId = checkAccount.id;
    const result = await AccountDAO.updateVerifyEmailForgotPassword(accountId, {
      verifyOtp: newOtp,
      expiredOtp: expireTime,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateVerifyOtpByEmail(data) {
    const { email, otp } = data;
    const checkAccount = await this.getAccountByEmail(email);

    const accountId = checkAccount?.id;
    const currentTime = new Date();
    const otpVerify = checkAccount?.verifyOtp;
    const otpExpiry = checkAccount?.expiredOtp;

    if (!otpVerify || Number(otpVerify) !== Number(otp))
      throw new BadRequestError("MÃ XÁC THỰC KHÔNG ĐÚNG HOẶC ĐÃ HẾT HẠN");

    if (!otpExpiry || currentTime > otpExpiry)
      throw new BadRequestError("MÃ XÁC THỰC ĐÃ HẾT HẠN");

    const result = await AccountDAO.updateVerifyOtpByEmail(accountId);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateResetPassword(data) {
    const { email, password } = data;
    const checkValidPassword = await validPasswordInput(password);
    if (!checkValidPassword)
      throw new BadRequestError(
        "MẬT KHẨU ÍT NHẤT 8 KÍ TỰ, BAO GỒM CHỮ HOA_THƯỜNG & SỐ & KÍ TỰ ĐẶC BIỆT"
      );

    const checkAccount = await this.getAccountByEmail(email);

    const accountId = checkAccount?.id;

    const isValidPassword = await hashPassword(password);

    const result = await AccountDAO.updateResetPassword(
      accountId,
      isValidPassword
    );

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateRefreshToken(data) {
    const { id, token } = data;
    await this.getAccountById(id);

    const result = await AccountDAO.updateRefreshToken(id, token);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async deleteAccount(id) {
    await this.getAccountById(id);

    await AccountDAO.delete(id);
  }
}

module.exports = new AccountBUS();

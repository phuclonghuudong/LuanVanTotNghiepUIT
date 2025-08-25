const sendEmail = require("../configs/sendMail");
const AccountBUS = require("./account.service");
const CustomerBUS = require("./customer.service");
const PersonnelBUS = require("./personnel.service");
const RoleBUS = require("./role.service");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");
const {
  comparePassword,
  validEmailInput,
  isValidNormalizeDate,
} = require("../utils/isValidateInput");
const { validateAccountStatus } = require("../utils/validateStatus");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate");

class AuthBUS {
  async userAccountInformation(account, user, role) {
    return {
      role: role?.slug,
      userId: user?.id,
      accountId: account?.id,
      roleId: account?.roleId,
      username: account?.username,
      phone: account?.phone,
      email: account?.email,
      fullname: user?.fullname,
      gender: user?.gender,
      birthday: user?.birthday,
      address: user?.address,
      avatar: user?.avatar,
      status: account?.status,
    };
  }

  async checkAccountAndCustomer(accountId) {
    const checkAccount = await AccountBUS.getAccountById(accountId);

    const checkCustomer = await CustomerBUS.getCustomerByAccountId(accountId);

    const checkRole = await RoleBUS.getRoleById(checkAccount?.roleId);

    const result = await this.userAccountInformation(
      checkAccount,
      checkCustomer,
      checkRole
    );

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async signUpCustomer(data) {
    const createAccount = await AccountBUS.createAccount({
      ...data,
      role: "CUSTOMER",
    });

    const accountId = createAccount?.id;

    const createCustomer = await CustomerBUS.createCustomer({
      ...data,
      accountId: accountId,
      groupId: 1,
    });

    const roleId = createAccount?.roleId;
    const findRole = await RoleBUS.getRoleById(roleId);

    const result = await this.userAccountInformation(
      createAccount,
      createCustomer,
      findRole
    );

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async signIn(data) {
    const { username, password } = data;
    const checkAccount = await AccountBUS.getAccountByIdentifier(username);

    const isValidPassword = await comparePassword(
      password,
      checkAccount.password
    );
    if (!isValidPassword)
      throw new BadRequestError("TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG CHÍNH XÁC");

    const accountId = checkAccount?.id;
    const roleId = checkAccount?.roleId;

    const findRole = await RoleBUS.getRoleById(roleId);

    const [customer, personnel] = await Promise.all([
      CustomerBUS.getCustomerByAccountIdLogin(accountId),
      PersonnelBUS.getPersonnelByAccountIdLogin(accountId),
    ]);

    const entity = customer ?? personnel;

    const result = await this.userAccountInformation(
      checkAccount,
      entity,
      findRole
    );

    await validateAccountStatus(result?.status);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async verifyEmailForgotPasswordCustomer(email) {
    const isValidEmail = await validEmailInput(email);
    if (!isValidEmail) throw new BadRequestError("EMAIL KHÔNG ĐÚNG ĐỊNH DẠNG");

    const result = await AccountBUS.updateVerifyEmailForgotPassword(email);

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from MolXiPi SHOP",
      html: verifyEmailTemplate({
        name: result?.username,
        otp: result?.verifyOtp,
      }),
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async verifyOtpByEmail(data) {
    const checkAccount = await AccountBUS.updateVerifyOtpByEmail(data);

    return checkAccount;
  }

  async resetPassword(data) {
    const result = await AccountBUS.updateResetPassword(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async refreshToken(data) {
    const result = await AccountBUS.updateRefreshToken(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async editInfoCustomer(userId, accountId, data) {
    const checkUser = await CustomerBUS.getCustomerById(userId);
    const checkAccount = await AccountBUS.getAccountById(accountId);
    const roleId = checkAccount?.roleId;

    const findRole = await RoleBUS.getRoleById(roleId);

    const isSame = Boolean(
      checkUser.fullname === data.fullname &&
        Number(checkUser.gender) === Number(data.gender) &&
        isValidNormalizeDate(checkUser.birthday) ===
          isValidNormalizeDate(data.birthday) &&
        checkUser.address === (data.address || null) &&
        checkUser.avatar === (data.avatar || null) &&
        checkAccount.username === data.username &&
        checkAccount.phone === data.phone &&
        checkAccount.email === data.email
    );

    if (isSame) {
      throw new ConflictError("DỮ LIỆU KHÔNG CÓ GÌ THAY ĐỔI ");
    }

    const updateCustomer = await CustomerBUS.updateInfoCustomer(userId, data);
    const updateAccount = await AccountBUS.updateAccountInfo(accountId, data);

    const result = await this.userAccountInformation(
      updateAccount,
      updateCustomer,
      findRole
    );

    return result;
  }
}

module.exports = new AuthBUS();

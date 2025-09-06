const AccountBUS = require("../services/account.service");
const RoleBUS = require("../services/role.service");
const CustomerBUS = require("../services/customer.service");
const PersonnelBUS = require("../services/personnel.service");
const { BadRequestError } = require("../utils/errors");
const {
  comparePassword,
  validEmailInput,
} = require("../utils/isValidateInput");
const { validateAccountStatus } = require("../utils/validateStatus");
const sendEmail = require("../configs/sendMail");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate");

class AuthUserBUS {
  async userAccountInformation({ account, user, role }) {
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

    const roleId = checkAccount?.roleId;

    const checkRole = await RoleBUS.getRoleById(roleId);

    const [customer, personnel] = await Promise.all([
      CustomerBUS.getCustomerByAccountIdLogin(accountId),
      PersonnelBUS.getPersonnelByAccountIdLogin(accountId),
    ]);

    const entity = customer ?? personnel;

    const result = await this.userAccountInformation({
      account: checkAccount,
      user: entity,
      role: checkRole,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async loginUser(data) {
    const { username, password } = data;
    const checkUser = await AccountBUS.getAccountByIdentifier(username);

    const isValidPassword = await comparePassword(password, checkUser.password);
    if (!isValidPassword)
      throw new BadRequestError("TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG CHÍNH XÁC");

    const accountId = checkUser?.id;
    const roleId = checkUser?.roleId;

    const findRole = await RoleBUS.getRoleById(roleId);

    const [customer, personnel] = await Promise.all([
      CustomerBUS.getCustomerByAccountIdLogin(accountId),
      PersonnelBUS.getPersonnelByAccountIdLogin(accountId),
    ]);

    const entity = customer ?? personnel;

    const result = await this.userAccountInformation({
      account: checkUser,
      user: entity,
      role: findRole,
    });

    await validateAccountStatus(result?.status);

    if (!result)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async registerCustomer(data) {
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

    const result = await this.userAccountInformation({
      account: createAccount,
      user: createCustomer,
      role: findRole,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result;
  }

  async sendForgotPasswordEmail(email) {
    const isValidEmail = await validEmailInput(email);
    if (!isValidEmail) throw new BadRequestError("EMAIL KHÔNG ĐÚNG ĐỊNH DẠNG");

    const result = await AccountBUS.updateSendForgotPasswordEmail(email);

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
}

module.exports = new AuthUserBUS();

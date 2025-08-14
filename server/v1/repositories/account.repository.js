const { PrismaClient } = require("@prisma/client");
const AccountDTO = require("../models/account.model");
const prisma = new PrismaClient();

class AccountDAO {
  async findAll() {
    const result = await prisma.account.findMany();
    return result.map((x) => new AccountDTO(x));
  }

  async findById(id) {
    const result = await prisma.account.findUnique({
      where: { account_id: id },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findByUsername(value) {
    const result = await prisma.account.findUnique({
      where: { username: value },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findByEmail(value) {
    const result = await prisma.account.findUnique({
      where: { email: value },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findByPhone(value) {
    const result = await prisma.account.findUnique({
      where: { phone: value },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findByIdentifier(value) {
    const result = await prisma.account.findFirst({
      where: {
        OR: [{ username: value }, { email: value }, { phone: value }],
      },
    });
    return result ? new AccountDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.account.create({
      data: {
        // role: { connect: { role_id: Number(data.roleId) } },\
        role_id: Number(data.roleId),
        username: data?.username,
        password: data?.password,
        phone: data?.phone,
        email: data?.email,
        verify_email: data?.verifyEmail || null,
        verify_otp: data?.verifyOtp || null,
        expired_otp: data?.expiredOtp || null,
        refresh_token: data?.refreshToken || null,
        status: Number(data?.status) || 1,
      },
    });
    return new AccountDTO(result);
  }

  async updateVerifyEmailForgotPassword(id, value) {
    const result = await prisma.account.update({
      where: { account_id: id },
      data: {
        verify_otp: value?.verifyOtp,
        expired_otp: value?.expiredOtp,
      },
    });
    return new AccountDTO(result);
  }

  async updateVerifyOtpByEmail(id) {
    const result = await prisma.account.update({
      where: { account_id: id },
      data: {
        verify_otp: null,
        expired_otp: null,
      },
    });
    return new AccountDTO(result);
  }

  async updateResetPassword(id, value) {
    const result = await prisma.account.update({
      where: { account_id: id },
      data: {
        password: value,
      },
    });
    return new AccountDTO(result);
  }

  async updateRefreshToken(id, value) {
    const result = await prisma.account.update({
      where: { account_id: id },
      data: { refresh_token: value },
    });
    return new AccountDTO(result);
  }

  async update(id, data) {
    const result = await prisma.account.update({
      where: { account_id: id },
      data: {
        role_id: Number(data.roleId),
        username: data?.username,
        password: data?.password,
        phone: data?.phone,
        email: data?.email,
        verify_email: data?.verifyEmail || null,
        verify_otp: data?.verifyOtp || null,
        expired_otp: data?.expiredOtp || null,
        refresh_token: data?.refreshToken || null,
        status: Number(data?.status) || 1,
      },
    });
    return new AccountDTO(result);
  }

  async delete(id) {
    await prisma.account.delete({
      where: { account_id: id },
    });
  }
}

module.exports = new AccountDAO();

const { PrismaClient } = require("@prisma/client");
const AccountDTO = require("../models/account.model");
const prisma = new PrismaClient();

class AccountDAO {
  async findAllAccounts() {
    const result = await prisma.account.findMany();
    return result.map((x) => new AccountDTO(x));
  }

  async findAccountById(id) {
    const result = await prisma.account.findUnique({
      where: { account_id: Number(id) },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findAccountByUsername(value) {
    const result = await prisma.account.findUnique({
      where: { username: value },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findAccountByEmail(value) {
    const result = await prisma.account.findUnique({
      where: { email: value },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findAccountByPhone(value) {
    const result = await prisma.account.findUnique({
      where: { phone: value },
    });
    return result ? new AccountDTO(result) : result;
  }

  async findAccountByIdentifier(value) {
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

  async updateVerificationOtp(id, value) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
      data: {
        verify_otp: value?.verifyOtp,
        expired_otp: value?.expiredOtp,
      },
    });
    return new AccountDTO(result);
  }

  async clearVerificationOtp(id) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
      data: {
        verify_otp: null,
        expired_otp: null,
      },
    });
    return new AccountDTO(result);
  }

  async updatePassword(id, value) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
      data: {
        password: value,
      },
    });
    return new AccountDTO(result);
  }

  async updateRefreshToken(id, value) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
      data: { refresh_token: value },
    });
    return new AccountDTO(result);
  }

  async updateAccount(id, data) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
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
        status: Number(data?.status) ?? 1,
      },
    });
    return new AccountDTO(result);
  }

  async updateAccountInfo(id, data) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
      data: {
        username: data?.username,
        phone: data?.phone,
        email: data?.email,
      },
    });
    return new AccountDTO(result);
  }

  async softDelete(id) {
    const result = await prisma.account.update({
      where: { account_id: Number(id) },
      data: { status: -1 },
    });
    return new AccountDTO(result);
  }

  async hardDelete(id) {
    const result = await prisma.account.delete({
      where: { account_id: Number(id) },
    });
    return new AccountDTO(result);
  }
}

module.exports = new AccountDAO();

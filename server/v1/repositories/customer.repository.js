const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomerDTO = require("../models/customer.model");

class CustomerDAO {
  async findAllCustomers() {
    const result = await prisma.customer.findMany();
    return result.map((x) => new CustomerDTO(x));
  }

  async findCustomerById(id) {
    const result = await prisma.customer.findUnique({
      where: { customer_id: Number(id) },
    });
    return result ? new CustomerDTO(result) : result;
  }

  async findCustomerByAccount(value) {
    const result = await prisma.customer.findUnique({
      where: { account_id: Number(value) },
    });
    return result ? new CustomerDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.customer.create({
      data: {
        account_id: Number(data.accountId),
        group_id: Number(data.groupId),
        fullname: data.fullname,
        gender: data.gender || null,
        birthday: data.birthday || null,
        points: Number(data.point) ?? 0,
        address: data.address || null,
        avatar: data?.avatar || null,
        status: Number(data?.status) || 1,
      },
    });
    return new CustomerDTO(result);
  }

  async update(id, data) {
    const result = await prisma.customer.update({
      where: { customer_id: Number(id) },
      data: {
        account_id: Number(data.accountId),
        group_id: Number(data.groupId),
        fullname: data.fullname,
        gender: data.gender,
        birthday: data.birthday,
        points: Number(data.point),
        address: data.address,
        avatar: data.avatar,
        status: Number(data.status) ?? 1,
      },
    });
    return new CustomerDTO(result);
  }

  async updateEditInfo(id, data) {
    const result = await prisma.customer.update({
      where: { customer_id: Number(id) },
      data: {
        fullname: data?.fullname,
        gender: data?.gender,
        birthday: new Date(data.birthday),
        address: data?.address,
        avatar: data?.avatar,
      },
    });
    return new CustomerDTO(result);
  }

  async updateCustomerByStatus(id, status) {
    const result = await prisma.customer.update({
      where: { customer_id: Number(id) },
      data: { status: Number(status) },
    });
    return new CustomerDTO(result);
  }

  async softDeleteCustomer(id) {
    const result = await prisma.customer.update({
      where: { customer_id: Number(id) },
      data: { status: -1 },
    });
    return new CustomerDTO(result);
  }

  async hardDeleteCustomer(id) {
    const result = await prisma.customer.delete({
      where: { customer_id: Number(id) },
    });
    return new CustomerDTO(result);
  }
}

module.exports = new CustomerDAO();

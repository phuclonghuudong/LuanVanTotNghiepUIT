const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomerDTO = require("../models/customer.model");

class CustomerDAO {
  async findAll() {
    const result = await prisma.customer.findMany();
    return result.map((x) => new CustomerDTO(x));
  }

  async findById(id) {
    const result = await prisma.customer.findUnique({
      where: { customer_id: id },
    });
    return result ? new CustomerDTO(result) : null;
  }

  async findByAccountId(value) {
    const result = await prisma.customer.findUnique({
      where: { account_id: value },
    });
    return result ? new CustomerDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.customer.create({
      data: {
        account_id: data.account_id,
        group_id: data.group_id,
        fullname: data.fullname,
        gender: data.gender || null,
        birthday: data.birthday || null,
        points: data.point ?? 0,
        address: data.address || null,
        avatar: data.avatar || null,
        status: data.status || 1,
      },
    });
    return new CustomerDTO(result);
  }

  async update(id, data) {
    const result = await prisma.customer.update({
      where: { customer_id: id },
      data,
    });
    return new CustomerDTO(result);
  }

  async updateEditInfo(id, data) {
    const result = await prisma.customer.update({
      where: { customer_id: id },
      data: {
        fullname: data?.fullname || null,
        gender: data?.gender ?? null,
        birthday: data?.birthday ? new Date(data.birthday) : null,
        address: data?.address || null,
        avatar: data?.avatar || null,
      },
    });
    return new CustomerDTO(result);
  }

  async delete(id) {
    await prisma.customer.delete({
      where: { customer_id: id },
    });
  }
}

module.exports = new CustomerDAO();

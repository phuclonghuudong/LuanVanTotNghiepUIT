const { PrismaClient } = require("@prisma/client");
const CustomerGroupDTO = require("../models/customerGroup.model");
const prisma = new PrismaClient();

class CustomerGroupDAO {
  async findAllCustomerGroups() {
    const result = await prisma.customerGroup.findMany();
    return result.map((x) => new CustomerGroupDTO(x));
  }

  async findActiveCustomerGroups(status) {
    const result = await prisma.customerGroup.findMany({
      where: { status: 1 },
    });
    return result.map((c) => new CustomerGroupDTO(c));
  }

  async findAvailableCustomerGroups() {
    const result = await prisma.customerGroup.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new CustomerGroupDTO(c));
  }

  async findCustomerGroupByStatus(status = 1) {
    const result = await prisma.customerGroup.findMany({
      where: { status },
    });
    return result.map((c) => new CustomerGroupDTO(c));
  }

  async findCustomerGroupById(id) {
    const result = await prisma.customerGroup.findUnique({
      where: { group_id: Number(id) },
    });
    return result ? new CustomerGroupDTO(result) : result;
  }

  async findCustomerGroupByName(name) {
    const result = await prisma.customerGroup.findUnique({
      where: { group_name: name },
    });
    return result ? new CustomerGroupDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.customerGroup.create({
      data: {
        group_name: data.name,
        description: data.description || null,
        status: Number(data.status) ?? 1,
      },
    });
    return new CustomerGroupDTO(result);
  }

  async update(id, data) {
    const result = await prisma.customerGroup.update({
      where: { group_id: Number(id) },
      data: {
        group_name: data.name,
        description: data.description,
        status: Number(data.status),
      },
    });
    return new CustomerGroupDTO(result);
  }

  async softDeleteCustomerGroup(id) {
    const result = await prisma.customerGroup.update({
      where: { group_id: Number(id) },
      data: { status: -1 },
    });
    return new CustomerGroupDTO(result);
  }

  async hardDeleteCustomerGroup(id) {
    const result = await prisma.customerGroup.delete({
      where: { group_id: Number(id) },
    });
    return new CustomerGroupDTO(result);
  }
}

module.exports = new CustomerGroupDAO();

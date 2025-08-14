const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomerGroupDTO = require("../models/customerGroup.model");

class CustomerGroupDAO {
  async findAll() {
    const result = await prisma.customerGroup.findMany();
    return result.map((x) => new CustomerGroupDTO(x));
  }

  async findById(id) {
    const result = await prisma.customerGroup.findUnique({
      where: { group_id: id },
    });
    return result ? new CustomerGroupDTO(result) : result;
  }

  async findByName(value) {
    const result = await prisma.customerGroup.findUnique({
      where: { group_name: value },
    });
    return result ? new CustomerGroupDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.customerGroup.create({
      data: {
        group_name: data.name,
        description: data.description || "",
        status: data.status || 1,
      },
    });
    return new CustomerGroupDTO(result);
  }

  async update(id, data) {
    const result = await prisma.customerGroup.update({
      where: { group_id: id },
      data: {
        group_name: data.name,
        description: data.description,
        status: data.status,
      },
    });
    return new CustomerGroupDTO(result);
  }

  async delete(id) {
    return await prisma.customerGroup.delete({
      where: { group_id: id },
    });
  }
}

module.exports = new CustomerGroupDAO();

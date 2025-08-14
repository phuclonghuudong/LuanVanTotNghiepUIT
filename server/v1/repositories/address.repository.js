const { PrismaClient } = require("@prisma/client");
const AddressDTO = require("../models/address.model");
const prisma = new PrismaClient();

class AddressDAO {
  async findAll() {
    const result = await prisma.address.findMany();
    return result.map((x) => new AddressDTO(x));
  }

  async findById(id) {
    const result = await prisma.address.findUnique({
      where: { address_id: id },
    });
    return result ? new AddressDTO(result) : result;
  }

  async findByCustomerId(id) {
    const result = await prisma.address.findMany({
      where: { customer_id: id },
    });
    return result.map((x) => new AddressDTO(x));
  }

  async create(data) {
    const result = await prisma.address.create({
      data: {
        customer_id: data.customer_id,
        fullname: data.fullname || null,
        phone: data.phone || null,
        address: data.address || null,
        is_main: data.is_main || false,
        status: data.status || 1,
      },
    });
    return new AddressDTO(result);
  }

  async update(id, data) {
    const result = await prisma.address.update({
      where: { address_id: id },
      data: {
        fullname: data?.fullname,
        phone: data?.phone,
        address: data?.address,
        is_main: data?.isMain,
        status: data?.status,
      },
    });
    return new AddressDTO(result);
  }

  async delete(id) {
    await prisma.address.delete({
      where: { address_id: id },
    });
    1;
  }
}

module.exports = new AddressDAO();

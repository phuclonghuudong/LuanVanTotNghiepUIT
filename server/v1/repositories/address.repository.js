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
      where: { address_id: Number(id) },
    });
    return result ? new AddressDTO(result) : result;
  }

  async findByCustomerId(id) {
    const result = await prisma.address.findMany({
      where: { customer_id: Number(id) },
    });
    return result.map((x) => new AddressDTO(x));
  }

  async findByIdAndCustomer(id, customer) {
    const result = await prisma.address.findMany({
      where: { customer_id: Number(customer), address_id: Number(id) },
    });
    return result ? new AddressDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.address.create({
      data: {
        customer_id: Number(data.customer_id),
        fullname: data.fullname || null,
        phone: data.phone || null,
        address: data.address || null,
        is_main: data.isMain ?? false,
        status: Number(data.status) ?? 1,
      },
    });
    return new AddressDTO(result);
  }

  async update(id, data) {
    const result = await prisma.address.update({
      where: { address_id: Number(id) },
      data: {
        fullname: data?.fullname,
        phone: data?.phone,
        address: data?.address,
        is_main: data?.isMain ?? false,
        status: Number(data?.status),
      },
    });
    return new AddressDTO(result);
  }

  async softDelete(id) {
    const result = await prisma.address.update({
      where: { address_id: Number(id) },
      data: { status: -1 },
    });
    return new AddressDTO(result);
  }

  async hardDelete(id) {
    const result = await prisma.address.delete({
      where: { address_id: Number(id) },
    });
    return new AddressDTO(result);
  }
}

module.exports = new AddressDAO();

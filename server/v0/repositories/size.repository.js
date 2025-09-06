const { PrismaClient } = require("@prisma/client");
const SizeDTO = require("../models/size.model");
const prisma = new PrismaClient();

class SizeDAO {
  async findAll() {
    return (await prisma.size.findMany()).map((c) => new SizeDTO(c));
  }

  async findByStatus(status = 1) {
    return (await prisma.size.findMany({ where: { status } })).map(
      (c) => new SizeDTO(c)
    );
  }

  async findById(id) {
    const res = await prisma.size.findUnique({ where: { size_id: id } });
    return res ? new SizeDTO(res) : res;
  }

  async findByName(value) {
    const res = await prisma.size.findUnique({ where: { size_name: value } });
    return res ? new SizeDTO(res) : res;
  }

  async findByCode(value) {
    const res = await prisma.size.findUnique({ where: { size_code: value } });
    return res ? new SizeDTO(res) : res;
  }

  async create(data) {
    const res = await prisma.size.create({
      data: {
        size_name: data.name,
        size_code: data.code,
        size_type: data.type,
        display_order: data.displayOrder,
        status: data.status ?? 1,
      },
    });
    return new SizeDTO(res);
  }

  async update(id, data) {
    const res = await prisma.size.update({
      where: { size_id: id },
      data: {
        size_name: data.name,
        size_code: data.code,
        size_type: data.type,
        display_order: data.displayOrder,
        status: data.status,
      },
    });
    return new SizeDTO(res);
  }
}

module.exports = new SizeDAO();

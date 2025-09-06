const { PrismaClient } = require("@prisma/client");
const ColorDTO = require("../models/color.model");
const prisma = new PrismaClient();

class ColorDAO {
  async findAll() {
    return (await prisma.color.findMany()).map((c) => new ColorDTO(c));
  }

  async findByStatus(status = 1) {
    return (await prisma.color.findMany({ where: { status } })).map(
      (c) => new ColorDTO(c)
    );
  }

  async findById(id) {
    const res = await prisma.color.findUnique({ where: { color_id: id } });
    return res ? new ColorDTO(res) : res;
  }

  async findByName(value) {
    const res = await prisma.color.findUnique({ where: { color_name: value } });
    return res ? new ColorDTO(res) : res;
  }

  async findByCode(value) {
    const res = await prisma.color.findUnique({ where: { color_code: value } });
    return res ? new ColorDTO(res) : res;
  }

  async create(data) {
    const res = await prisma.color.create({
      data: {
        color_name: data.name,
        color_code: data.code,
        display_order: data.displayOrder,
        status: data.status ?? 1,
      },
    });
    return new ColorDTO(res);
  }

  async update(id, data) {
    const res = await prisma.color.update({
      where: { color_id: id },
      data: {
        color_name: data.name,
        color_code: data.code,
        display_order: data.displayOrder,
        status: data.status,
      },
    });
    return new ColorDTO(res);
  }
}

module.exports = new ColorDAO();

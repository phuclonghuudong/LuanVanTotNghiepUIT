const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const AttributeDTO = require("../models/attribute.model");

class AttributeDAO {
  async findAll() {
    const result = await prisma.attribute.findMany();
    return result.map((x) => new AttributeDTO(x));
  }

  async findByStatus1() {
    const result = await prisma.attribute.findMany({
      where: {
        status: 1,
      },
    });
    return result.map((x) => new AttributeDTO(x));
  }

  async findByStatusNotMinus1() {
    const result = await prisma.attribute.findMany({
      where: {
        status: { not: -1 },
      },
    });
    return result.map((x) => new AttributeDTO(x));
  }

  async findById(value) {
    const result = await prisma.attribute.findUnique({
      where: { attribute_id: value },
    });
    return result ? new AttributeDTO(result) : null;
  }

  async findByName(value) {
    const result = await prisma.attribute.findUnique({
      where: { attribute_name: value },
    });
    return result ? new AttributeDTO(result) : null;
  }

  async findBySlug(value) {
    const result = await prisma.attribute.findUnique({
      where: { attribute_slug: value },
    });
    return result ? new AttributeDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.attribute.create({
      data: {
        attribute_name: data.name,
        attribute_slug: data.slug,
        attribute_type: data.type,
        is_custom: data.isCustom || false,
        status: data.status || 1,
      },
    });
    return new AttributeDTO(result);
  }

  async update(id, data) {
    const result = await prisma.attribute.update({
      where: { attribute_id: id },
      data: {
        attribute_name: data.name,
        attribute_slug: data.slug,
        attribute_type: data.type,
        is_custom: data.isCustom,
        status: data.status,
      },
    });
    return new AttributeDTO(result);
  }

  async delete(id) {
    await prisma.attribute.delete({
      where: { attribute_id: id },
    });
  }
}

module.exports = new AttributeDAO();

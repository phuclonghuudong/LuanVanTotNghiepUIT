const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CategoryAttributeDTO = require("../models/categoryAttribute.model");

class CategoryAttributeDAO {
  async findAll() {
    const result = await prisma.categoryAttribute.findMany();
    return result.map((x) => new CategoryAttributeDTO(x));
  }

  async findByCategoryAndAttribute(ca, at) {
    const result = await prisma.categoryAttribute.findFirst({
      where: {
        category_id: ca,
        attribute_id: at,
      },
    });
    return result ? new CategoryAttributeDTO(result) : null;
  }

  async findByStatus1() {
    const result = await prisma.categoryAttribute.findMany({
      where: { status: 1 },
    });
    return result.map((x) => new CategoryAttributeDTO(x));
  }

  async findByStatusNotMinus1() {
    const result = await prisma.categoryAttribute.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((x) => new CategoryAttributeDTO(x));
  }

  async findById(id) {
    const result = await prisma.categoryAttribute.findUnique({
      where: { id: id },
    });
    return result ? new CategoryAttributeDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.categoryAttribute.create({
      data: {
        category_id: data.categoryId,
        attribute_id: data.attributeId,
        description: data.description,
        status: data.status ?? 1,
      },
    });
    return new CategoryAttributeDTO(result);
  }

  async update(id, data) {
    const result = await prisma.categoryAttribute.update({
      where: { id: id },
      data: {
        category_id: data.categoryId,
        attribute_id: data.attributeId,
        description: data.description,
        status: data.status,
      },
    });
    return new CategoryAttributeDTO(result);
  }

  async delete(id) {
    await prisma.categoryAttribute.delete({
      where: { id: id },
    });
  }

  async findByCategory(id) {
    const result = await prisma.categoryAttribute.findUnique({
      where: { category_id: id },
    });
    return result ? new CategoryAttributeDTO(result) : null;
  }
}

module.exports = new CategoryAttributeDAO();

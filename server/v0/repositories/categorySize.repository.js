const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CategorySizeDTO = require("../models/categorySize.model");

class CategorySizeDAO {
  async findAll() {
    const result = await prisma.categorySize.findMany();
    return result.map((x) => new CategorySizeDTO(x));
  }

  async findByCategoryAndSize(ca, si) {
    const result = await prisma.categorySize.findFirst({
      where: {
        category_id: ca,
        size_id: si,
      },
    });
    return result ? new CategorySizeDTO(result) : null;
  }

  async findByStatus1() {
    const result = await prisma.categorySize.findMany({
      where: { status: 1 },
    });
    return result.map((x) => new CategorySizeDTO(x));
  }

  async findByStatusNotMinus1() {
    const result = await prisma.categorySize.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((x) => new CategorySizeDTO(x));
  }

  async findById(id) {
    const result = await prisma.categorySize.findUnique({
      where: { id: id },
    });
    return result ? new CategorySizeDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.categorySize.create({
      data: {
        category_id: data.categoryId,
        size_id: data.sizeId,
        description: data.description,
        status: data.status ?? 1,
      },
    });
    return new CategorySizeDTO(result);
  }

  async update(id, data) {
    const result = await prisma.categorySize.update({
      where: { id: id },
      data: {
        category_id: data.categoryId,
        size_id: data.sizeId,
        description: data.description,
        status: data.status,
      },
    });
    return new CategorySizeDTO(result);
  }

  async delete(id) {
    await prisma.categorySize.delete({
      where: { id: id },
    });
  }

  async findByCategory(id) {
    const result = await prisma.categorySize.findUnique({
      where: { category_id: id },
    });
    return result ? new CategorySizeDTO(result) : null;
  }
}

module.exports = new CategorySizeDAO();

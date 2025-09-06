const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CategorySizeDTO = require("../models/categorySize.model");

class CategorySizeDAO {
  async findAllCategorySize() {
    const result = await prisma.categorySize.findMany({
      include: {
        category: true,
        size: true,
      },
    });
    return result.map((x) => new CategorySizeDTO(x));
  }

  async findActiveCategorySize(status = 1) {
    const result = await prisma.categorySize.findMany({
      where: { status },
    });
    return result.map((c) => new CategorySizeDTO(c));
  }

  async findCategorySizeById(id) {
    const result = await prisma.categorySize.findUnique({
      where: { id: Number(id) },
    });
    return result ? new CategorySizeDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.categorySize.create({
      data: {
        category_id: Number(data.categoryId),
        size_id: Number(data.sizeId),
        description: data.name,
        status: Number(data.status) ?? 1,
      },
    });
    return new CategorySizeDTO(result);
  }

  async update(id, data) {
    const result = await prisma.categorySize.create({
      where: { id: Number(id) },
      data: {
        category_id: Number(data.categoryId),
        size_id: Number(data.sizeId),
        description: data.name,
        status: Number(data.status),
      },
    });
    return new CategorySizeDTO(result);
  }

  async softDeleteCategorySize(id) {
    const result = await prisma.categorySize.update({
      where: { id: Number(id) },
      data: { status: -1 },
    });
    return new CategorySizeDTO(result);
  }

  async hardDeleteCategorySize(id) {
    const result = await prisma.categorySize.delete({
      where: { id: Number(id) },
    });
    return new CategorySizeDTO(result);
  }
}

module.exports = new CategorySizeDAO();

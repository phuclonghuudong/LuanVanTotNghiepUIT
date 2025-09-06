const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CategoryDTO = require("../models/category.model");

class CategoryDAO {
  async findAll() {
    const categories = await prisma.category.findMany();
    return categories.map((c) => new CategoryDTO(c));
  }

  async findById(id) {
    const category = await prisma.category.findUnique({
      where: { category_id: id },
    });
    return category ? new CategoryDTO(category) : null;
  }

  async findByName(id) {
    const category = await prisma.category.findUnique({
      where: { category_name: id },
    });
    return category ? new CategoryDTO(category) : null;
  }

  async findBySlug(slug) {
    const category = await prisma.category.findUnique({
      where: { category_slug: slug },
    });
    return category ? new CategoryDTO(category) : null;
  }

  async findByStatus1() {
    const categories = await prisma.category.findMany({
      where: {
        status: 1,
      },
    });
    return categories.map((c) => new CategoryDTO(c));
  }

  async findByStatusNotMinus1() {
    const categories = await prisma.category.findMany({
      where: {
        status: {
          not: -1,
        },
      },
    });
    return categories.map((c) => new CategoryDTO(c));
  }

  async findByStatus12() {
    const categories = await prisma.category.findMany({
      where: {
        status: {
          in: [1, 2],
        },
      },
    });
    return categories.map((c) => new CategoryDTO(c));
  }

  async create(data) {
    const category = await prisma.category.create({
      data: {
        category_name: data.name,
        category_slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        status: data.status || 1,
      },
    });
    return new CategoryDTO(category);
  }

  async update(id, data) {
    const category = await prisma.category.update({
      where: { category_id: id },
      data: {
        category_name: data.name,
        category_slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        status: data.status,
      },
    });
    return new CategoryDTO(category);
  }

  async delete(id) {
    await prisma.category.delete({
      where: { category_id: id },
    });
  }
}

module.exports = new CategoryDAO();

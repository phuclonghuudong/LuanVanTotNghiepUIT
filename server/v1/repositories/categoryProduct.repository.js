const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CategoryProductDTO = require("../models/categoryProduct.model");

class CategoryProductDAO {
  async findAll() {
    const categories = await prisma.categoryProduct.findMany();
    return categories.map((c) => new CategoryProductDTO(c));
  }

  async findByStatus1() {
    const categories = await prisma.categoryProduct.findMany({
      where: { status: 1 },
    });
    return categories.map((c) => new CategoryProductDTO(c));
  }

  async findByStatusNotMinus1() {
    const categories = await prisma.categoryProduct.findMany({
      where: { status: { not: -1 } },
    });
    return categories.map((c) => new CategoryProductDTO(c));
  }

  async findById(id) {
    const category = await prisma.categoryProduct.findUnique({
      where: { category_product_id: id },
    });
    return category ? new CategoryProductDTO(category) : null;
  }

  async findByName(id) {
    const category = await prisma.categoryProduct.findUnique({
      where: { category_product_name: id },
    });
    return category ? new CategoryProductDTO(category) : null;
  }

  async findBySlug(slug) {
    const category = await prisma.categoryProduct.findUnique({
      where: { category_product_slug: slug },
    });
    return category ? new CategoryProductDTO(category) : null;
  }

  async findByStatus12() {
    const categories = await prisma.categoryProduct.findMany({
      where: {
        status: {
          in: [1, 2],
        },
      },
    });
    return categories.map((c) => new CategoryProductDTO(c));
  }

  async create(data) {
    const category = await prisma.categoryProduct.create({
      data: {
        category_id: data.categoryId,
        category_product_name: data.name,
        category_product_slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        status: data.status || 1,
      },
    });
    return new CategoryProductDTO(category);
  }

  async update(id, data) {
    const category = await prisma.categoryProduct.update({
      where: { category_product_id: id },
      data: {
        category_id: data.categoryId,
        category_product_name: data.name,
        category_product_slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        status: data.status,
      },
    });
    return new CategoryProductDTO(category);
  }

  async delete(id) {
    await prisma.categoryProduct.delete({
      where: { category_product_id: id },
    });
  }
}

module.exports = new CategoryProductDAO();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CategoryProductDTO = require("../models/categoryProduct.model");

class CategoryProductDAO {
  async findAllCategoryProduct() {
    const result = await prisma.categoryProduct.findMany();
    return result.map((x) => new CategoryProductDTO(x));
  }

  async findActiveCategoryProduct(status = 1) {
    const result = await prisma.categoryProduct.findMany({
      where: { status },
    });
    return result.map((c) => new CategoryProductDTO(c));
  }

  async findAvailableCategoryProduct() {
    const result = await prisma.categoryProduct.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new CategoryProductDTO(c));
  }

  async findCategoryProductByStatus(status = 1) {
    const result = await prisma.categoryProduct.findMany({
      where: { status },
    });
    return result.map((c) => new CategoryProductDTO(c));
  }

  async findCategoryProductById(id) {
    const result = await prisma.categoryProduct.findUnique({
      where: { category_product_id: Number(id) },
    });
    return result ? new CategoryProductDTO(result) : result;
  }

  async findCategoryProductByName(name) {
    const result = await prisma.categoryProduct.findUnique({
      where: { category_product_name: name },
    });
    return result ? new CategoryProductDTO(result) : result;
  }

  async findCategoryProductBySlug(slug) {
    const result = await prisma.categoryProduct.findUnique({
      where: { category_product_slug: slug },
    });
    return result ? new CategoryProductDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.categoryProduct.create({
      data: {
        category_id: Number(data.categoryId),
        category_product_name: data.name,
        category_product_slug: data.slug,
        description: data.description || null,
        image_url: data.imageUrl || null,
        status: Number(data.status) ?? 1,
      },
    });
    return new CategoryProductDTO(result);
  }

  async update(id, data) {
    const result = await prisma.categoryProduct.update({
      where: { category_product_id: Number(id) },
      data: {
        category_id: Number(data.categoryId),
        category_product_name: data.name,
        category_product_slug: data.slug,
        description: data.description || null,
        image_url: data.imageUrl || null,
        status: Number(data.status),
      },
    });
    return new CategoryProductDTO(result);
  }

  async softDeleteCategoryProduct(id) {
    const result = await prisma.categoryProduct.update({
      where: { category_product_id: Number(id) },
      data: { status: -1 },
    });
    return new CategoryProductDTO(result);
  }

  async hardDeleteCategoryProduct(id) {
    const result = await prisma.categoryProduct.delete({
      where: { category_product_id: Number(id) },
    });
    return new CategoryProductDTO(result);
  }
}

module.exports = new CategoryProductDAO();

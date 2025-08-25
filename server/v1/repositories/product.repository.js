const { PrismaClient } = require("@prisma/client");
const ProductDTO = require("../models/product.model");

const prisma = new PrismaClient();

class ProductDAO {
  async findAll() {
    return (await prisma.product.findMany()).map((c) => new ProductDTO(c));
  }

  async findAllStatus1(status = 1) {
    return (await prisma.product.findMany({ where: { status } })).map(
      (c) => new ProductDTO(c)
    );
  }

  async findAllNotMinus1() {
    return (
      await prisma.product.findMany({ where: { status: { not: -1 } } })
    ).map((c) => new ProductDTO(c));
  }

  async findById(id, options = {}) {
    const res = await prisma.product.findUnique({
      where: { product_id: id },
      include: {
        brand: options.includeBrand ?? false,
        categoryProduct: options.includeCategory ?? false,
        imgProductFK: options.includeImages ?? false,
      },
    });
    return res ? new ProductDTO(res) : res;
  }

  async findBySlug(value) {
    const res = await prisma.product.findUnique({
      where: { product_slug: value },
    });
    return res ? new ProductDTO(res) : res;
  }

  async findByName(value) {
    const res = await prisma.product.findUnique({
      where: { product_name: value },
    });
    return res ? new ProductDTO(res) : res;
  }

  async findBySku(value) {
    const res = await prisma.product.findUnique({
      where: { product_sku: value },
    });
    return res ? new ProductDTO(res) : res;
  }

  async create(data) {
    const res = await prisma.product.create({
      data: {
        category_product_id: Number(data.categoryId),
        brand_id: Number(data.brandId),
        product_name: data.name,
        product_slug: data.slug,
        product_sku: data.sku,
        views: data.views ?? 0,
        description: data.description,
        status: Number(data.status) ?? 1,
      },
    });
    return new ProductDTO(res);
  }

  async update(id, data) {
    const res = await prisma.product.update({
      where: { product_id: Number(id) },
      data: {
        category_product_id: Number(data.categoryId),
        brand_id: Number(data.brandId),
        product_name: data.name,
        product_slug: data.slug,
        product_sku: data.sku,
        views: Number(data.views || null),
        description: data.description,
        status: Number(data.status),
      },
    });
    return new ProductDTO(res);
  }

  async delete(id) {
    await prisma.product.delete({
      where: { product_id: id },
    });
  }
}

module.exports = new ProductDAO();

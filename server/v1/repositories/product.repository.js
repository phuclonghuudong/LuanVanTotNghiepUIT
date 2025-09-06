const ProductDTO = require("../models/product.model");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductDAO {
  async findAllProduct() {
    const result = await prisma.product.findMany({
      include: {
        brand: true,
        categoryProduct: true,
        productVariant: { include: { color: true, size: true } },
        imgProduct: true,
      },
    });
    return result.map((c) => new ProductDTO(c));
  }

  async findActiveProduct(status = 1) {
    const result = await prisma.product.findMany({
      where: { status },
    });
    return result.map((c) => new ProductDTO(c));
  }

  async findAvailableProduct() {
    const result = await prisma.product.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new ProductDTO(c));
  }

  async findProductByStatus(status) {
    const result = await prisma.product.findMany({
      where: { status },
    });
    return result.map((c) => new ProductDTO(c));
  }

  async findProductById(id) {
    const result = await prisma.product.findUnique({
      where: { product_id: Number(id) },
    });
    return result ? new ProductDTO(result) : result;
  }

  async findProductByName(name) {
    const result = await prisma.product.findUnique({
      where: { product_name: name },
    });
    return result ? new ProductDTO(result) : result;
  }

  async findProductBySlug(slug) {
    const result = await prisma.product.findUnique({
      where: { product_slug: slug },
    });
    return result ? new ProductDTO(result) : result;
  }

  async findProductBySku(value) {
    const result = await prisma.product.findUnique({
      where: { product_sku: value },
    });
    return result ? new ProductDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.product.create({
      data: {
        product_name: data.name,
        product_slug: data.slug,
        product_sku: data.sku,
        description: data.description,
        view: Number(data.view) ?? 0,
        brand_id: Number(data.brandId),
        category_product_id: Number(data.categoryProductId),
        status: Number(data.status) ?? 1,
      },
    });
    return new ProductDTO(result);
  }

  async update(id, data) {
    const result = await prisma.product.update({
      where: { product_id: Number(id) },
      data: {
        product_name: data.name,
        product_slug: data.slug,
        product_sku: data.sku,
        description: data.description,
        view: Number(data.view) ?? 0,
        brand_id: Number(data.brandId),
        category_product_id: Number(data.categoryProductId),
        status: Number(data.status) ?? 1,
      },
    });
    return new ProductDTO(result);
  }

  async updateViews(id) {
    const result = await prisma.product.update({
      where: { product_id: Number(id) },
      data: {
        view: Number(data.view) + 1,
      },
    });
    return new ProductDTO(result);
  }

  async softDeleteProduct(id) {
    const result = await prisma.product.update({
      where: { product_id: Number(id) },
      data: { status: -1 },
    });
    return new ProductDTO(result);
  }

  async hardDeleteProduct(id) {
    const result = await prisma.product.delete({
      where: { product_id: Number(id) },
    });
    return new ProductDTO(result);
  }
}

module.exports = new ProductDAO();

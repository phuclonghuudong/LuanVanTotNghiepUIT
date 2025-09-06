const ProductVariantDTO = require("../models/productVariant.model");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductDAO {
  async findAllProductVariant() {
    const result = await prisma.productVariant.findMany();
    return result.map((c) => new ProductVariantDTO(c));
  }

  async findActiveProductVariant(status = 1) {
    const result = await prisma.productVariant.findMany({
      where: { status },
    });
    return result.map((c) => new ProductVariantDTO(c));
  }

  async findAvailableProductVariant() {
    const result = await prisma.productVariant.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new ProductVariantDTO(c));
  }

  async findProductVariantByStatus(status) {
    const result = await prisma.productVariant.findMany({
      where: { status },
    });
    return result.map((c) => new ProductVariantDTO(c));
  }

  async findProductVariantById(id) {
    const result = await prisma.productVariant.findUnique({
      where: { variant_id: Number(id) },
    });
    return result ? new ProductVariantDTO(result) : result;
  }

  async findProductVariantByName(value) {
    const result = await prisma.productVariant.findUnique({
      where: { name: value },
    });
    return result ? new ProductVariantDTO(result) : result;
  }

  async findProductVariantBySku(value) {
    const result = await prisma.productVariant.findUnique({
      where: { sku: value },
    });
    return result ? new ProductVariantDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.productVariant.create({
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        avg_cost: data.avgCost,
        price_sell: data.priceSell,
        price_original: data.priceOriginal,
        is_default: data.isDefault ?? 1,
        product_id: Number(data.productId),
        color_id: Number(data.colorId),
        size_id: Number(data.sizeId),
        status: Number(data.status) ?? 1,
      },
    });
    return new ProductVariantDTO(result);
  }

  async update(id, data) {
    const result = await prisma.productVariant.update({
      where: { variant_id: Number(id) },
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        avg_cost: data.avgCost,
        price_sell: data.priceSell,
        price_original: data.priceOriginal,
        is_default: data.isDefault,
        product_id: Number(data.productId),
        color_id: Number(data.colorId),
        size_id: Number(data.sizeId),
        status: Number(data.status),
      },
    });
    return new ProductVariantDTO(result);
  }

  async updatePrice(id, data) {
    const result = await prisma.productVariant.update({
      where: { variant_id: Number(id) },
      data: {
        avg_cost: data.avgCost,
        price_sell: data.priceSell,
        price_original: data.priceOriginal,
      },
    });
    return new ProductVariantDTO(result);
  }

  async softDeleteProductVariant(id) {
    const result = await prisma.productVariant.update({
      where: { variant_id: Number(id) },
      data: { status: -1 },
    });
    return new ProductVariantDTO(result);
  }

  async hardDeleteProductVariant(id) {
    const result = await prisma.productVariant.delete({
      where: { variant_id: Number(id) },
    });
    return new ProductVariantDTO(result);
  }
}

module.exports = new ProductDAO();

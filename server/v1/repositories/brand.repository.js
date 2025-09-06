const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const BrandDTO = require("../models/brand.model");

class BrandDAO {
  async findAllBrands() {
    const result = await prisma.brand.findMany();
    return result.map((x) => new BrandDTO(x));
  }

  async findActiveBrands(status = 1) {
    const result = await prisma.brand.findMany({
      where: { status },
    });
    return result.map((c) => new BrandDTO(c));
  }

  async findAvailableBrands() {
    const result = await prisma.brand.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new BrandDTO(c));
  }

  async findBrandByStatus(status = 1) {
    const result = await prisma.brand.findMany({
      where: { status },
    });
    return result.map((c) => new BrandDTO(c));
  }

  async findBrandById(id) {
    const result = await prisma.brand.findUnique({
      where: { brand_id: Number(id) },
    });
    return result ? new BrandDTO(result) : result;
  }

  async findBrandByName(name) {
    const result = await prisma.brand.findUnique({
      where: { brand_name: name },
    });
    return result ? new BrandDTO(result) : result;
  }

  async findBrandBySlug(slug) {
    const result = await prisma.brand.findUnique({
      where: { brand_slug: slug },
    });
    return result ? new BrandDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.brand.create({
      data: {
        brand_name: data.name,
        brand_slug: data.slug,
        description: data.description || null,
        image_url: data.imageUrl || null,
        status: Number(data.status) ?? 1,
      },
    });
    return new BrandDTO(result);
  }

  async update(id, data) {
    const result = await prisma.brand.update({
      where: { brand_id: Number(id) },
      data: {
        brand_name: data.name,
        brand_slug: data.slug,
        description: data.description || null,
        image_url: data.imageUrl || null,
        status: Number(data.status),
      },
    });
    return new BrandDTO(result);
  }

  async softDeleteBrand(id) {
    const result = await prisma.brand.update({
      where: { brand_id: Number(id) },
      data: { status: -1 },
    });
    return new BrandDTO(result);
  }

  async hardDeleteBrand(id) {
    const result = await prisma.brand.delete({
      where: { brand_id: Number(id) },
    });
    return new BrandDTO(result);
  }
}
module.exports = new BrandDAO();

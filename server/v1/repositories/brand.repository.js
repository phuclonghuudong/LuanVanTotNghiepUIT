const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const BrandDTO = require("../models/brand.model");

class BrandDAO {
  async findAll() {
    const result = await prisma.brand.findMany();
    return result.map((x) => new BrandDTO(x));
  }

  async findById(id) {
    const result = await prisma.brand.findUnique({
      where: { brand_id: id },
    });
    return result ? new BrandDTO(result) : null;
  }

  async findByName(id) {
    const result = await prisma.brand.findUnique({
      where: { brand_name: id },
    });
    return result ? new BrandDTO(result) : null;
  }

  async findBySlug(slug) {
    const result = await prisma.brand.findUnique({
      where: { brand_slug: slug },
    });
    return result ? new BrandDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.brand.create({
      data: {
        brand_name: data.name,
        brand_slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        status: data.status || 1,
      },
    });
    return new BrandDTO(result);
  }

  async update(id, data) {
    const result = await prisma.brand.update({
      where: { brand_id: id },
      data: {
        brand_name: data.name,
        brand_slug: data.slug,
        description: data.description,
        image_url: data.imageUrl,
        status: data.status,
      },
    });
    return new BrandDTO(result);
  }

  async delete(id) {
    await prisma.brand.delete({
      where: { brand_id: id },
    });
  }
}

module.exports = new BrandDAO();

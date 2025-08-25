const { PrismaClient } = require("@prisma/client");
const ImageProductDetailDTO = require("../models/imageProductDetail.model");
const prisma = new PrismaClient();

class ImageProductDetailDAO {
  async findAll() {
    return (await prisma.imgProductDetail.findMany()).map(
      (c) => new ImageProductDetailDTO(c)
    );
  }

  async findByStatus1(status = 1) {
    return (await prisma.imgProductDetail.findMany({ where: { status } })).map(
      (c) => new ImageProductDetailDTO(c)
    );
  }

  async findByNotMinus1() {
    return (
      await prisma.imgProductDetail.findMany({ where: { status: { not: -1 } } })
    ).map((c) => new ImageProductDetailDTO(c));
  }

  async findById(id) {
    const result = await prisma.imgProductDetail.findUnique({
      where: { img_id: Number(id) },
    });
    return result ? new ImageProductDetailDTO(result) : null;
  }

  async findByVariantId(id) {
    const result = await prisma.imgProductDetail.findUnique({
      where: { variant_id: Number(id) },
    });
    return result ? new ImageProductDetailDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.imgProductDetail.create({
      data: {
        variant_id: Number(data.variantId),
        image_url: data.imageUrl,
        is_main: data.is_main,
        status: Number(data.status),
      },
    });

    return new ImageProductDetailDTO(result);
  }

  async update(id, data) {
    const result = await prisma.imgProductDetail.update({
      where: { img_id: Number(id) },
      data: {
        variant_id: Number(data.variantId),
        image_url: data.imageUrl,
        is_main: data.is_main,
        status: Number(data.status),
      },
    });

    return new ImageProductDetailDTO(result);
  }

  async delete(id) {
    const result = await prisma.imgProductDetail.delete({
      where: { img_id: Number(id) },
    });
    return new ImageProductDetailDTO(result);
  }
}

module.exports = new ImageProductDetailDAO();

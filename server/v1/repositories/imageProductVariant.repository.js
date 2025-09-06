const { PrismaClient } = require("@prisma/client");
const ImageProductDetailDTO = require("../models/imageProductDetail.model");
const prisma = new PrismaClient();

class ImageProductVariantDAO {
  async findAllImage() {
    return (await prisma.imgProductDetail.findMany()).map(
      (c) => new ImageProductDetailDTO(c)
    );
  }

  async findActiveImage(status = 1) {
    return (await prisma.imgProductDetail.findMany({ where: { status } })).map(
      (c) => new ImageProductDetailDTO(c)
    );
  }

  async findAvailableImage() {
    return (
      await prisma.imgProductDetail.findMany({ where: { status: { not: -1 } } })
    ).map((c) => new ImageProductDetailDTO(c));
  }

  async findImageById(id) {
    const result = await prisma.imgProductDetail.findUnique({
      where: { img_id: Number(id) },
    });
    return result ? new ImageProductDetailDTO(result) : null;
  }

  async findByProductId(id) {
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
        is_main: data.isMain ?? 1,
        status: Number(data.status) ?? 1,
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
        is_main: data.isMain,
        status: Number(data.status),
      },
    });

    return new ImageProductDetailDTO(result);
  }

  async softDeleteImage(id) {
    const result = await prisma.imgProductDetail.update({
      where: { img_id: Number(id) },
      data: { status: -1 },
    });
    return new ImageProductDetailDTO(result);
  }

  async hardDeleteImage(id) {
    const result = await prisma.imgProductDetail.delete({
      where: { img_id: Number(id) },
    });
    return new ImageProductDetailDTO(result);
  }
}

module.exports = new ImageProductVariantDAO();

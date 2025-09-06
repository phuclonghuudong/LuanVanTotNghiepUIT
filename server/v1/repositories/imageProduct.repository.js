const { PrismaClient } = require("@prisma/client");
const ImageProductDTO = require("../models/imageProduct.model");
const prisma = new PrismaClient();

class ImageProductDAO {
  async findAllImage() {
    return (await prisma.imgProduct.findMany()).map(
      (c) => new ImageProductDTO(c)
    );
  }

  async findActiveImage(status = 1) {
    return (await prisma.imgProduct.findMany({ where: { status } })).map(
      (c) => new ImageProductDTO(c)
    );
  }

  async findAvailableImage() {
    return (
      await prisma.imgProduct.findMany({ where: { status: { not: -1 } } })
    ).map((c) => new ImageProductDTO(c));
  }

  async findImageById(id) {
    const result = await prisma.imgProduct.findUnique({
      where: { img_id: Number(id) },
    });
    return result ? new ImageProductDTO(result) : null;
  }

  async findByProductId(id) {
    const result = await prisma.imgProduct.findUnique({
      where: { product_id: Number(id) },
    });
    return result ? new ImageProductDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.imgProduct.create({
      data: {
        product_id: Number(data.productId),
        image_url: data.imageUrl,
        is_main: data.isMain ?? 1,
        status: Number(data.status) ?? 1,
      },
    });

    return new ImageProductDTO(result);
  }

  async update(id, data) {
    const result = await prisma.imgProduct.update({
      where: { img_id: Number(id) },
      data: {
        product_id: Number(data.productId),
        image_url: data.imageUrl,
        is_main: data.isMain,
        status: Number(data.status),
      },
    });

    return new ImageProductDTO(result);
  }

  async softDeleteImage(id) {
    const result = await prisma.imgProduct.update({
      where: { img_id: Number(id) },
      data: { status: -1 },
    });
    return new ImageProductDTO(result);
  }

  async hardDeleteImage(id) {
    const result = await prisma.imgProduct.delete({
      where: { img_id: Number(id) },
    });
    return new ImageProductDTO(result);
  }
}

module.exports = new ImageProductDAO();

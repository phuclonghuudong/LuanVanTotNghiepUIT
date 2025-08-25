const ImageProductVariantDAO = require("../repositories/imageProductVariant.repository");
const { NotFoundError, ConflictError } = require("../utils/errors");

class ImageProductVariantBUS {
  async getById(id) {
    const result = await ImageProductVariantDAO.findById(id);
    if (!result) throw new NotFoundError("HÌNH ẢNH KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getByProduct(id) {
    const result = await ImageProductVariantDAO.findByVariantId(id);
    if (!result) throw new NotFoundError("SẢN PHẨM CHƯA CÓ HÌNH ẢNH");

    return result.toJSON?.() ?? result;
  }

  async createImageProductVariant(data) {
    const result = await ImageProductVariantDAO.create(data);
    return result.toJSON?.() ?? result;
  }

  async updateImageProductVariant(id, data) {
    const checkId = await this.getById(id);

    const isSame =
      checkId.imageUrl === data.imageUrl &&
      Number(checkId.status) === Number(data.status) &&
      Number(checkId.isMain) === Number(data.isMain) &&
      Number(checkId.productId) === Number(data.productId);
    if (isSame) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await ImageProductVariantDAO.update(data);
    return result.toJSON?.() ?? result;
  }

  async deleteImageProductVariant(id) {
    await this.getById(id);

    const result = await ImageProductVariantDAO.delete(data);
    return result.toJSON?.() ?? result;
  }
}

module.exports = new ImageProductVariantBUS();

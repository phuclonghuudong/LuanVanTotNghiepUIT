const ImageProductDAO = require("../repositories/imageProduct.repository");
const ProductDAO = require("./product.service");
const { NotFoundError, ConflictError } = require("../utils/errors");

class ImageProductBUS {
  async getById(id) {
    const result = await ImageProductDAO.findById(id);
    if (!result) throw new NotFoundError("HÌNH ẢNH KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getByProduct(id) {
    const result = await ImageProductDAO.findByProductId(id);
    if (!result) throw new NotFoundError("SẢN PHẨM CHƯA CÓ HÌNH ẢNH");

    return result.toJSON?.() ?? result;
  }

  async createImageProduct(data) {
    await ProductDAO.getProductById(data.productId);

    const result = await ImageProductDAO.create(data);
    return result.toJSON?.() ?? result;
  }

  async updateImageProduct(id, data) {
    await ProductDAO.getProductById(data.productId);

    const checkId = await this.getById(id);

    const isSame =
      checkId.imageUrl === data.imageUrl &&
      Number(checkId.status) === Number(data.status) &&
      Number(checkId.isMain) === Number(data.isMain) &&
      Number(checkId.productId) === Number(data.productId);
    if (isSame) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await ImageProductDAO.update(data);
    return result.toJSON?.() ?? result;
  }

  async deleteImageProduct(id) {
    await this.getById(id);

    const result = await ImageProductDAO.delete(data);
    return result.toJSON?.() ?? result;
  }
}

module.exports = new ImageProductBUS();

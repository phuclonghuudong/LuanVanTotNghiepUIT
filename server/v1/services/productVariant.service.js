const ProductVariantDAO = require("../repositories/productVariant.repository");
const ColorBUS = require("./color.service");
const ProductBUS = require("./product.service");
const SizeBUS = require("./size.service");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class ProductVariantBUS {
  async getAllProductVariant() {
    const result = await ProductVariantDAO.findAllProductVariant();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllProductVariantActive() {
    const result = await ProductVariantDAO.findActiveProductVariant();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getProductVariantById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await ProductVariantDAO.findProductVariantById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getProductVariantByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN BIẾN THỂ KHÔNG HỢP LỆ");
    }

    const result = await ProductVariantDAO.findProductByName(name);
    if (!result) throw new NotFoundError("TÊN SẢN PHẨM KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getProductVariantBySku(sku) {
    if (!sku) {
      throw new BadRequestError("MÃ SẢN PHÂM KHÔNG HỢP LỆ");
    }

    const result = await ProductVariantDAO.findProductBySlug(sku);
    if (!result) throw new NotFoundError("MÃ SẢN PHẨM KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { sku, name } = data;
    const [existingBySku, existingByName] = await Promise.all([
      ProductVariantDAO.findProductVariantBySku(sku),
      ProductVariantDAO.findProductByName(name),
    ]);

    if (existingBySku) throw new ConflictError("MÃ BIẾN THỂ ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN BIẾN THỂ ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { sku, name } = data;
    const [existingBySku, existingByName] = await Promise.all([
      ProductVariantDAO.findProductVariantBySku(sku),
      ProductVariantDAO.findProductByName(name),
    ]);

    const productId = existingBySku.product_id;
    if (existingBySku && Number(productId) !== Number(excludeId))
      throw new ConflictError("MÃ BIẾN THỂ ĐÃ TỒN TẠI ");

    if (existingByName && Number(productId) !== Number(excludeId))
      throw new ConflictError(" TÊN BIẾN THỂ ĐÃ TỒN TẠI ");
  }

  async createProductVariant(data) {
    const { colorId, sizeId, productId } = data;

    await ColorBUS.getColorById(colorId);
    await ProductBUS.getProductById(productId);
    await SizeBUS.getSizeById(sizeId);

    await this.validateForCreate(data);
    const result = await ProductVariantDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateProductVariant(id, data) {
    const { colorId, sizeId, productId } = data;

    await ColorBUS.getColorById(colorId);
    await ProductBUS.getProductById(productId);
    await SizeBUS.getSizeById(sizeId);

    const oldData = await this.getAllProductVariant(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      oldData.code === data.code &&
      oldData.type === (data.type || null) &&
      Number(oldData.displayOrder) === Number(data.displayOrder) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await ProductVariantDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteProduct(id) {
    const checkId = await this.getProductById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await ProductVariantDAO.softDeleteProduct(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new ProductVariantBUS();

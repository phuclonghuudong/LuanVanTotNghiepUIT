const ProductDAO = require("../repositories/product.repository");
const BrandBUS = require("../services/brand.service");
const CategoryProductBUS = require("../services/categoryProduct.service");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class ProductBUS {
  async getAllProduct() {
    const result = await ProductDAO.findAllProduct();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllProductActive() {
    const result = await ProductDAO.findActiveProduct();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getProductById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await ProductDAO.findProductById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getProductByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN SẢN PHẨM KHÔNG HỢP LỆ");
    }

    const result = await ProductDAO.findProductByName(name);
    if (!result) throw new NotFoundError("TÊN SẢN PHẨM KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getProductBySlug(slug) {
    if (!slug) {
      throw new BadRequestError("ĐỊNH DANH SẢN PHẨM KHÔNG HỢP LỆ");
    }

    const result = await ProductDAO.findProductBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH SẢN PHẨM KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getProductBySku(sku) {
    if (!sku) {
      throw new BadRequestError("MÃ SẢN PHÂM KHÔNG HỢP LỆ");
    }

    const result = await ProductDAO.findProductBySlug(sku);
    if (!result) throw new NotFoundError("MÃ SẢN PHẨM KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { sku, slug, name } = data;
    const [existingBySku, existingBySlug, existingByName] = await Promise.all([
      ProductDAO.findProductBySku(sku),
      ProductDAO.findProductBySlug(slug),
      ProductDAO.findProductByName(name),
    ]);

    if (existingBySku) throw new ConflictError("MÃ SẢN PHẨM ĐÃ TỒN TẠI");
    if (existingBySlug)
      throw new ConflictError("ĐỊNH DANH SẢN PHẨM ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN SẢN PHẨM ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { sku, slug, name } = data;
    const [existingBySku, existingBySlug, existingByName] = await Promise.all([
      ProductDAO.findProductBySku(sku),
      ProductDAO.findProductBySlug(slug),
      ProductDAO.findProductByName(name),
    ]);

    const productId = existingBySku.product_id;
    if (existingBySku && Number(productId) !== Number(excludeId))
      throw new ConflictError("MÃ SẢN PHẨM ĐÃ TỒN TẠI ");

    if (existingBySlug && Number(productId) !== Number(excludeId))
      throw new ConflictError("MÃ ĐỊNH DANH ĐÃ TỒN TẠI ");

    if (existingByName && Number(productId) !== Number(excludeId))
      throw new ConflictError(" TÊN SẢN PHẨM ĐÃ TỒN TẠI ");
  }

  async createProduct(data) {
    const { brandId, categoryProductId } = data;

    await BrandBUS.getBrandById(brandId);
    await CategoryProductBUS.getCategoryProductById(categoryProductId);

    await this.validateForCreate(data);
    const result = await ProductDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateProduct(id, data) {
    const { brandId, categoryProductId } = data;

    await BrandBUS.getBrandById(brandId);
    await CategoryProductBUS.getCategoryProductById(categoryProductId);

    const oldData = await this.getProductById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      oldData.code === data.code &&
      oldData.type === (data.type || null) &&
      Number(oldData.displayOrder) === Number(data.displayOrder) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await ProductDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteProduct(id) {
    const checkId = await this.getProductById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await ProductDAO.softDeleteProduct(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new ProductBUS();

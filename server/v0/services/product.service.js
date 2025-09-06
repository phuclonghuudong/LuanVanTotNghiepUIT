const ProductDAO = require("../repositories/product.repository");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");
const BrandBUS = require("../services/brand.service");
const CategoryProductBUS = require("../services/categoryProduct.service");
const {
  isValidSlugInput,
  isValidSkuInput,
} = require("../utils/isValidateInput");

class ProductBUS {
  async getAllProduct() {
    const result = await ProductDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllProductActive() {
    const result = await ProductDAO.findAllStatus1();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getProductById(id) {
    const result = await ProductDAO.findById(Number(id));
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getProductBySlug(value) {
    const result = await ProductDAO.findBySlug(value);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getProductBySku(sku) {
    const result = await ProductDAO.findBySku(sku);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async validateForCreateProduct(data) {
    const { sku, slug, name } = data;

    const isValidSlug = await isValidSlugInput(slug);
    if (!isValidSlug)
      throw new BadRequestError(
        "ĐỊNH DANH KHÔNG ĐÚNG ĐỊNH DẠNG (Ví dụ: thuc-the)"
      );

    const isValidSku = await isValidSkuInput(sku);
    if (!isValidSku)
      throw new BadRequestError("SKU SẢN PHẨM KHÔNG ĐÚNG ĐỊNH DẠNG");

    const [existingByName, existingBySlug, existingBySku] = await Promise.all([
      ProductDAO.findByName(name),
      ProductDAO.findBySlug(slug),
      ProductDAO.findBySku(sku),
    ]);
    if (existingByName) throw new ConflictError("TÊN SẢN PHẨM ĐÃ TỒN TẠI");
    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingBySku) throw new ConflictError("SKU ĐÃ TỒN TẠI");
  }

  async validateForUpdateProduct(id, data) {
    const { sku, slug, name } = data;
    const isValidSlug = await isValidSlugInput(slug);
    if (!isValidSlug)
      throw new BadRequestError(
        "ĐỊNH DANH KHÔNG ĐÚNG ĐỊNH DẠNG (Ví dụ: thuc-the)"
      );

    const isValidSku = await isValidSkuInput(sku);
    if (!isValidSku)
      throw new BadRequestError("SKU SẢN PHẨM KHÔNG ĐÚNG ĐỊNH DẠNG");

    const [existingByName, existingBySlug, existingBySku] = await Promise.all([
      ProductDAO.findByName(name),
      ProductDAO.findBySlug(slug),
      ProductDAO.findBySku(sku),
    ]);

    if (existingByName && Number(existingByName?.id) !== Number(id))
      throw new ConflictError("TÊN SẢN PHẨM ĐÃ TỒN TẠI Ở DANH MỤC KHÁC");
    if (existingBySlug && Number(existingBySlug?.id) !== Number(id))
      throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI Ở DANH MỤC KHÁC");
    if (existingBySku && Number(existingBySku?.id) !== Number(id))
      throw new ConflictError("SKU ĐÃ TỒN TẠI Ở DANH MỤC KHÁC");
  }

  async createProduct(data) {
    const { brandId, categoryId, sku, slug, name } = data;

    await BrandBUS.getBrandById(brandId);
    await CategoryProductBUS.getCategoryProductById(categoryId);

    await this.validateForCreateProduct(data);

    const result = await ProductDAO.create({
      ...data,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateProduct(id, data) {
    const { brandId, categoryId, sku, slug, name } = data;

    await this.getProductById(id);

    await BrandBUS.getBrandById(brandId);
    await CategoryProductBUS.getCategoryProductById(categoryId);

    await this.validateForUpdateProduct(id, data);

    const result = await ProductDAO.update(id, {
      ...data,
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new ProductBUS();

const CategoryProductDAO = require("../repositories/categoryProduct.repository");
const CategoryDAO = require("./category.service");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");
const { isValidSlugInput } = require("../utils/isValidateInput");

class CategoryProductBUS {
  async getAllCategoryProduct() {
    const result = await CategoryProductDAO.findAll();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllCategoryProductActive() {
    const result = await CategoryProductDAO.findByStatus1();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getCategoryProductById(id) {
    const result = await CategoryProductDAO.findById(Number(id));
    if (!result) throw new NotFoundError("DANH MỤC SẢN PHẨM KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCategoryProductBySlug(slug) {
    const result = await CategoryProductDAO.findBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;

    const isValidSlug = await isValidSlugInput(slug);
    if (!isValidSlug)
      throw new BadRequestError(
        "ĐỊNH DANH KHÔNG ĐÚNG ĐỊNH DẠNG (Ví dụ: thuc-the)"
      );

    const [existingBySlug, existingByName] = await Promise.all([
      CategoryProductDAO.findBySlug(slug),
      CategoryProductDAO.findByName(name),
    ]);

    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI!");
    if (existingByName) throw new ConflictError("TÊN LOẠI ĐÃ TỒN TẠI!");
  }

  async validateForUpdate(slug, name, excludeId) {
    const isValidSlug = await isValidSlugInput(slug);
    if (!isValidSlug)
      throw new BadRequestError(
        "ĐỊNH DANH KHÔNG ĐÚNG ĐỊNH DẠNG (Ví dụ: thuc-the)"
      );

    const [existingBySlug, existingByName] = await Promise.all([
      CategoryProductDAO.findBySlug(slug),
      CategoryProductDAO.findByName(name),
    ]);

    if (
      existingBySlug &&
      Number(existingBySlug.category_id) !== Number(excludeId)
    ) {
      throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI Ở DANH MỤC KHÁC!");
    }

    if (
      existingByName &&
      Number(existingByName.category_id) !== Number(excludeId)
    ) {
      throw new ConflictError("TÊN LOẠI ĐÃ TỒN TẠI Ở DANH MỤC KHÁC!");
    }
  }

  async createCategoryProduct(data) {
    const { categoryId, name, slug } = data;
    const checkCategory = await CategoryDAO.getCategoryById(categoryId);

    if (checkCategory?.status === -1)
      throw new BadRequestError(
        "KHÔNG THỂ THỰC HIỆN THAO TÁC, DANH MỤC ĐÃ BỊ XÓA"
      );

    await this.validateForCreate(data);

    const result = await CategoryProductDAO.create({
      ...data,
      categoryId: Number(categoryId),
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategoryProduct(id, data) {
    const { categoryId, name, slug, description, status, imageUrl } = data;

    const checkCategory = await CategoryDAO.getCategoryById(categoryId);

    if (checkCategory?.status === -1)
      throw new BadRequestError(
        "KHÔNG THỂ THỰC HIỆN THAO TÁC, DANH MỤC ĐÃ BỊ XÓA"
      );

    const oldCategory = await this.getCategoryProductById(id);

    await this.validateForUpdate(slug, name, id);

    const isUnchanged =
      oldCategory.category_id === categoryId &&
      oldCategory.category_product_slug === slug &&
      oldCategory.category_product_name === name &&
      oldCategory.description === description &&
      oldCategory.image_url === imageUrl &&
      Number(oldCategory.status) === Number(status);

    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI!");

    const result = await CategoryProductDAO.update(Number(id), {
      ...data,
      categoryId: Number(categoryId),
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async deleteCategoryProduct(id) {
    await this.getCategoryProductById(id);
    await CategoryProductDAO.delete(Number(id));
  }
}

module.exports = new CategoryProductBUS();

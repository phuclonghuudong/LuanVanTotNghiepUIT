const CategoryDAO = require("../repositories/category.repository");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");
const { isValidSlugInput } = require("../utils/isValidateInput");

class CategoryBUS {
  async getAllCategories() {
    const result = await CategoryDAO.findAll();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllCategoriesStatusEqual1() {
    const result = await CategoryDAO.findByStatus1();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllCategoriesStatusNotMinus1() {
    const result = await CategoryDAO.findByStatusNotMinus1();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getCategoryById(id) {
    const result = await CategoryDAO.findById(Number(id));
    if (!result) throw new NotFoundError("DANH MỤC KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getCategoryBySlug(slug) {
    const result = await CategoryDAO.findBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(slug, name) {
    const isValidSlug = await isValidSlugInput(slug);
    if (!isValidSlug)
      throw new BadRequestError(
        "ĐỊNH DANH KHÔNG ĐÚNG ĐỊNH DẠNG (Ví dụ: thuc-the)"
      );

    const [existingBySlug, existingByName] = await Promise.all([
      CategoryDAO.findBySlug(slug),
      CategoryDAO.findByName(name),
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
      CategoryDAO.findBySlug(slug),
      CategoryDAO.findByName(name),
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

  async createCategory(data) {
    await this.validateForCreate(data.slug, data.name);

    const result = await CategoryDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategory(id, data) {
    const oldCategory = await this.getCategoryById(id);

    await this.validateForUpdate(data.slug, data.name, id);

    const isUnchanged =
      oldCategory.category_slug === data.slug &&
      oldCategory.category_name === data.name &&
      oldCategory.description === data.description &&
      oldCategory.image_url === data.imageUrl &&
      Number(oldCategory.status) === Number(data.status);

    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI!");

    const result = await CategoryDAO.update(Number(id), data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async deleteCategory(id) {
    await this.getCategoryById(id);
    await CategoryDAO.delete(Number(id));
  }
}

module.exports = new CategoryBUS();

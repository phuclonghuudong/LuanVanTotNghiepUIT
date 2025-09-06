const CategoryDAO = require("../repositories/category.repository");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class CategoryBUS {
  async getAllCategories() {
    const result = await CategoryDAO.findAllCategories();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllCategoryActive() {
    const result = await CategoryDAO.findActiveCategories();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getCategoryById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await CategoryDAO.findCategoryById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCategoryByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN DANH MỤC KHÔNG HỢP LỆ");
    }

    const result = await CategoryDAO.findCategoryByName(name);
    if (!result) throw new NotFoundError("TÊN DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCategoryBySlug(slug) {
    if (!slug) {
      throw new BadRequestError("TÊN ĐỊNH DANH KHÔNG HỢP LỆ");
    }

    const result = await CategoryDAO.findCategoryBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      CategoryDAO.findCategoryBySlug(slug),
      CategoryDAO.findCategoryByName(name),
    ]);

    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN DANH MỤC ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      CategoryDAO.findCategoryBySlug(slug),
      CategoryDAO.findCategoryByName(name),
    ]);
    if (
      existingBySlug &&
      Number(existingBySlug.category_id) !== Number(excludeId)
    )
      throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI ");
    if (
      existingByName &&
      Number(existingByName.category_id) !== Number(excludeId)
    )
      throw new ConflictError(" TÊN DANH MỤC ĐÃ TỒN TẠI ");
  }

  async createCategory(data) {
    await this.validateForCreate(data);
    const result = await CategoryDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategory(id, data) {
    const oldData = await this.getCategoryById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      oldData.slug === data.slug &&
      oldData.description === (data.description || null) &&
      oldData.imageUrl === (data.imageUrl || null) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await CategoryDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteCategory(id) {
    const checkId = await this.getCategoryById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await CategoryDAO.softDeleteCategory(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new CategoryBUS();

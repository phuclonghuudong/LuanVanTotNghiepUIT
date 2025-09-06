const CategoryProductDAO = require("../repositories/categoryProduct.repository");
const CategoryBUS = require("../services/category.service");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class CategoryProductBUS {
  async getAllCategoryProduct() {
    const result = await CategoryProductDAO.findAllCategoryProduct();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllCategoryProductActive() {
    const result = await CategoryProductDAO.findActiveCategoryProduct();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getCategoryProductById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await CategoryProductDAO.findCategoryProductById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCategoryProductByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN DANH MỤC KHÔNG HỢP LỆ");
    }

    const result = await CategoryProductDAO.findCategoryProductByName(name);
    if (!result) throw new NotFoundError("TÊN DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCategoryProductBySlug(slug) {
    if (!slug) {
      throw new BadRequestError("TÊN ĐỊNH DANH KHÔNG HỢP LỆ");
    }

    const result = await CategoryProductDAO.findCategoryProductBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      CategoryProductDAO.findCategoryProductBySlug(slug),
      CategoryProductDAO.findCategoryProductByName(name),
    ]);

    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN DANH MỤC ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      CategoryProductDAO.findCategoryProductBySlug(slug),
      CategoryProductDAO.findCategoryProductByName(name),
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

  async createCategoryProduct(data) {
    await this.validateForCreate(data);

    await CategoryBUS.getCategoryById(data?.categoryId);

    const result = await CategoryProductDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategoryProduct(id, data) {
    const oldData = await this.getCategoryProductById(id);

    await CategoryBUS.getCategoryById(data?.categoryId);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      Number(oldData.categoryId) === Number(data.categoryId) &&
      oldData.slug === data.slug &&
      oldData.description === (data.description || null) &&
      oldData.imageUrl === (data.imageUrl || null) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await CategoryProductDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteCategoryProduct(id) {
    const checkId = await this.getCategoryProductById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await CategoryProductDAO.softDeleteCategoryProduct(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new CategoryProductBUS();

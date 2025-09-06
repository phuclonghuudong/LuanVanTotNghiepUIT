const CategorySizeDAO = require("../repositories/categorySize.repository");
const CategoryBUS = require("../services/category.service");
const SizeBUS = require("../services/size.service");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class CategorySizeBUS {
  async getAllCategorySize() {
    const result = await CategorySizeDAO.findAllCategorySize();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllCategorySizeActive() {
    const result = await CategorySizeDAO.findActiveCategorySize();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getCategorySizeById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await CategorySizeDAO.findCategorySizeById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DANH MỤC KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async createCategorySize(data) {
    const { categoryId, sizeId } = data;
    await CategoryBUS.getCategoryById(categoryId);
    await SizeBUS.getSizeById(sizeId);

    const result = await CategorySizeDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategorySize(id, data) {
    const oldData = await this.getCategorySizeById(id);

    const { categoryId, sizeId } = data;
    await CategoryBUS.getCategoryById(categoryId);
    await SizeBUS.getSizeById(sizeId);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      Number(oldData.categoryId) === Number(categoryId) &&
      Number(oldData.sizeId) === Number(sizeId) &&
      oldData.description === (data.description || null) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await CategorySizeDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteCategorySize(id) {
    const checkId = await this.getCategorySizeById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await CategorySizeDAO.softDeleteCategorySize(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new CategorySizeBUS();

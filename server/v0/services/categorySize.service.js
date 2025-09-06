const CategorySizeDAO = require("../repositories/categorySize.repository");
const SizeBUS = require("./size.service");
const CategoryBUS = require("./category.service");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");

class CategorySizeBUS {
  async getAllCategorySize() {
    const result = await CategorySizeDAO.findAll();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllCategorySizeActive() {
    const result = await CategorySizeDAO.findByStatus1();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async checkIfCreatedDataExists(category, size) {
    const checkNew = await CategorySizeDAO.findByCategoryAndSize(
      Number(category),
      Number(size)
    );
    if (checkNew) throw new ConflictError("DỮ LIỆU ĐÃ TỒN TẠI");
    return true;
  }

  async checkIfUpdatedDataExists(category, size, id) {
    const checkNew = await CategorySizeDAO.findByCategoryAndSize(
      Number(category),
      Number(size)
    );
    if (checkNew && checkNew.id !== Number(id)) {
      throw new ConflictError("DỮ LIỆU ĐÃ TỒN TẠI");
    }

    return true;
  }

  async checkActiveCategorySize(size, category) {
    if (Number(size?.status) === -1)
      throw new BadRequestError("KÍCH THƯỚC ĐÃ BỊ XÓA");
    if (Number(category?.status) === -1)
      throw new BadRequestError("DANH MỤC ĐÃ BỊ XÓA");

    return true;
  }

  async createCategorySize(data) {
    const { sizeId, categoryId } = data;
    const checkSize = await SizeBUS.getSizeById(sizeId);
    const checkCategory = await CategoryBUS.getCategoryById(categoryId);

    await this.checkActiveCategorySize(checkSize.status, checkCategory.status);

    await this.checkIfCreatedDataExists(categoryId, sizeId);

    const result = await CategorySizeDAO.create({
      ...data,
      categoryId: Number(categoryId),
      sizeId: Number(sizeId),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategorySize(id, data) {
    const { sizeId, categoryId, status } = data;
    const checkSize = await SizeBUS.getSizeById(sizeId);
    const checkCategory = await CategoryBUS.getCategoryById(categoryId);

    await this.checkActiveCategorySize(checkSize.status, checkCategory.status);

    await this.checkIfUpdatedDataExists(categoryId, sizeId);

    const result = await CategorySizeDAO.update(id, {
      ...data,
      categoryId: Number(categoryId),
      sizeId: Number(sizeId),
      status: Number(status),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new CategorySizeBUS();

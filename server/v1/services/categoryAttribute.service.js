const CategoryAttributeDAO = require("../repositories/categoryAttribute.repository");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");
const AttributeBUS = require("./attribute.service");
const CategoryBUS = require("./category.service");

class CategoryAttributeBUS {
  async getAllCategoryAttribute() {
    const result = await CategoryAttributeDAO.findAll();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllCategoryAttributeActive() {
    const result = await CategoryAttributeDAO.findByStatus1();

    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async checkIfCreatedDataExists(category, attribute) {
    const checkNew = await CategoryAttributeDAO.findByCategoryAndAttribute(
      Number(category),
      Number(attribute)
    );
    if (checkNew) throw new ConflictError("DỮ LIỆU ĐÃ TỒN TẠI");
    return true;
  }

  async checkIfUpdatedDataExists(category, attribute, id) {
    const checkNew = await CategoryAttributeDAO.findByCategoryAndAttribute(
      Number(category),
      Number(attribute)
    );
    if (checkNew && checkNew.id !== Number(id)) {
      throw new ConflictError("DỮ LIỆU ĐÃ TỒN TẠI");
    }

    return true;
  }

  async checkActiveCategoryAttribute(attribute, category) {
    if (Number(attribute?.status) === -1)
      throw new BadRequestError("THUỘC TÍNH ĐÃ BỊ XÓA");
    if (Number(category?.status) === -1)
      throw new BadRequestError("DANH MỤC ĐÃ BỊ XÓA");

    return true;
  }

  async createCategoryAttribute(data) {
    const { attributeId, categoryId } = data;
    const checkAttribute = await AttributeBUS.getAttributeById(attributeId);
    const checkCategory = await CategoryBUS.getCategoryById(categoryId);

    await checkActiveCategoryAttribute(
      checkAttribute.status,
      checkCategory.status
    );

    await this.checkIfCreatedDataExists(categoryId, attributeId);

    const result = await CategoryAttributeDAO.create({
      ...data,
      categoryId: Number(categoryId),
      attributeId: Number(attributeId),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCategoryAttribute(id, data) {
    const { attributeId, categoryId, status } = data;
    await AttributeBUS.getAttributeById(attributeId);
    await CategoryBUS.getCategoryById(categoryId);

    await this.checkIfUpdatedDataExists(categoryId, attributeId);

    const result = await CategoryAttributeDAO.update(id, {
      ...data,
      categoryId: Number(categoryId),
      attributeId: Number(attributeId),
      status: Number(status),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new CategoryAttributeBUS();

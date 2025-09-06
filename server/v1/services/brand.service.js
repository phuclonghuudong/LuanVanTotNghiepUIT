const BrandDAO = require("../repositories/brand.repository");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class BrandBUS {
  async getAllBrand() {
    const result = await BrandDAO.findAllBrands();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllBrandActive() {
    const result = await BrandDAO.findActiveBrands();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getBrandById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await BrandDAO.findBrandById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("THƯƠNG HIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getBrandByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN THƯƠNG HIỆU KHÔNG HỢP LỆ");
    }

    const result = await BrandDAO.findBrandByName(name);
    if (!result) throw new NotFoundError("TÊN THƯƠNG HIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getBrandBySlug(slug) {
    if (!slug) {
      throw new BadRequestError("ĐỊNH DANH THƯƠNG HIỆU KHÔNG HỢP LỆ");
    }

    const result = await BrandDAO.findBrandBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH THƯƠNG HIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      BrandDAO.findBrandBySlug(slug),
      BrandDAO.findBrandByName(name),
    ]);

    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN THƯƠNG HIỆU ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      BrandDAO.findBrandBySlug(slug),
      BrandDAO.findBrandByName(name),
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
      throw new ConflictError(" TÊN THƯƠNG HIỆU ĐÃ TỒN TẠI ");
  }

  async createBrand(data) {
    await this.validateForCreate(data);
    const result = await BrandDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateBrand(id, data) {
    const oldData = await this.getBrandById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      oldData.slug === data.slug &&
      oldData.description === (data.description || null) &&
      oldData.imageUrl === (data.imageUrl || null) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await BrandDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteBrand(id) {
    const checkId = await this.getBrandById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await BrandDAO.softDeleteBrand(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new BrandBUS();

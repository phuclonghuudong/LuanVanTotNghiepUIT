const SizeDAO = require("../repositories/size.repository");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class SizeBUS {
  async getAllSize() {
    const result = await SizeDAO.findAllSize();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllSizeActive() {
    const result = await SizeDAO.findActiveSize();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getSizeById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await SizeDAO.findSizeById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getSizeByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN DỮ LIỆU KHÔNG HỢP LỆ");
    }

    const result = await SizeDAO.findSizeByName(name);
    if (!result) throw new NotFoundError("TÊN DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getSizeByCode(code) {
    if (!code) {
      throw new BadRequestError("MÃ CODE KHÔNG HỢP LỆ");
    }

    const result = await SizeDAO.findSizeByCode(code);
    if (!result) throw new NotFoundError("MÃ CODE KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;
    const [existingByCode, existingByName] = await Promise.all([
      SizeDAO.findSizeByCode(slug),
      SizeDAO.findSizeByName(name),
    ]);

    if (existingByCode) throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN DỮ LIỆU ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { slug, name } = data;
    const [existingByCode, existingByName] = await Promise.all([
      SizeDAO.findSizeByCode(slug),
      SizeDAO.findSizeByName(name),
    ]);
    if (existingByCode && Number(existingByCode.size_id) !== Number(excludeId))
      throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI ");
    if (existingByName && Number(existingByName.size_id) !== Number(excludeId))
      throw new ConflictError(" TÊN DỮ LIỆU ĐÃ TỒN TẠI ");
  }

  async createSize(data) {
    await this.validateForCreate(data);
    const result = await SizeDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateSize(id, data) {
    const oldData = await this.getSizeById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      oldData.code === data.code &&
      oldData.type === (data.type || null) &&
      Number(oldData.displayOrder) === Number(data.displayOrder) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await SizeDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteSize(id) {
    const checkId = await this.getSizeById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await SizeDAO.softDeleteSize(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new SizeBUS();

const ColorDAO = require("../repositories/color.repository");
const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require("../utils/errors");

class ColorBUS {
  async getAllColor() {
    const result = await ColorDAO.findAllColors();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllColorActive() {
    const result = await ColorDAO.findActiveColors();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getColorById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await ColorDAO.findColorById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getColorByName(name) {
    if (!name) {
      throw new BadRequestError("TÊN DỮ LIỆU KHÔNG HỢP LỆ");
    }

    const result = await ColorDAO.findColorByName(name);
    if (!result) throw new NotFoundError("TÊN DỮ LIỆU KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getColorByCode(code) {
    if (!code) {
      throw new BadRequestError("MÃ CODE KHÔNG HỢP LỆ");
    }

    const result = await ColorDAO.findColorByCode(code);
    if (!result) throw new NotFoundError("MÃ CODE KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;
    const [existingByCode, existingByName] = await Promise.all([
      ColorDAO.findColorByCode(slug),
      ColorDAO.findColorByName(name),
    ]);

    if (existingByCode) throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN DỮ LIỆU ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { slug, name } = data;
    const [existingByCode, existingByName] = await Promise.all([
      ColorDAO.findColorByCode(slug),
      ColorDAO.findColorByName(name),
    ]);
    if (existingByCode && Number(existingByCode.color_id) !== Number(excludeId))
      throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI ");
    if (existingByName && Number(existingByName.color_id) !== Number(excludeId))
      throw new ConflictError(" TÊN DỮ LIỆU ĐÃ TỒN TẠI ");
  }

  async createColor(data) {
    await this.validateForCreate(data);
    const result = await ColorDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateColor(id, data) {
    const oldData = await this.getColorById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldData.name === data.name &&
      oldData.code === data.code &&
      Number(oldData.displayOrder) === Number(data.displayOrder) &&
      Number(oldData.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await ColorDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteColor(id) {
    const checkId = await this.getColorById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await ColorDAO.softDeleteColor(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new ColorBUS();

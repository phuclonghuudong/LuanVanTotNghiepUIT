const ColorDAO = require("../repositories/color.repository");
const { NotFoundError, ConflictError } = require("../utils/errors");

class ColorBUS {
  async getAllColor() {
    const result = await ColorDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllColorActive() {
    const result = await ColorDAO.findByStatus();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getColorById(id) {
    const result = await ColorDAO.findById(Number(id));
    if (!result) throw new NotFoundError("ID KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getColorByName(value) {
    const result = await ColorDAO.findByName(value);
    if (!result) throw new NotFoundError("TÊN KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getColorByCode(value) {
    const result = await ColorDAO.findByCode(value);
    if (!result) throw new NotFoundError("MÃ CODE KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { name, code } = data;
    const [existingByName, existingByCode] = await Promise.all([
      ColorDAO.findByName(name),
      ColorDAO.findByCode(code),
    ]);

    if (existingByName) throw new ConflictError("TÊN NÀY ĐÃ TỒN TẠI");
    if (existingByCode) throw new ConflictError("MÃ MÀU ĐÃ TỒN TẠI");
  }

  async validateForUpdate(id, data) {
    const { name, code } = data;
    const [existingByName, existingByCode] = await Promise.all([
      ColorDAO.findByName(name),
      ColorDAO.findByCode(code),
    ]);

    if (existingByName && Number(existingByName.color_id) !== Number(id))
      throw new ConflictError("TÊN MÀU ĐÃ TỒN TẠI");
    if (existingByCode && Number(existingByCode.color_id) !== Number(id))
      throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI");
  }

  async create(data) {
    await this.validateForCreate(data);

    const result = await ColorDAO.create(data);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async update(id, data) {
    await this.getColorById(id);
    await this.validateForUpdate(id, data);

    const result = await ColorDAO.update(Number(id), {
      ...data,
      displayOrder: Number(data.displayOrder),
      status: Number(data.status),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new ColorBUS();

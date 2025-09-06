const SizeDAO = require("../repositories/size.repository");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");
const { isValidSlugInput } = require("../utils/isValidateInput");

class SizeBUS {
  async getAllSize() {
    const result = await SizeDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getAllSizeActive() {
    const result = await SizeDAO.findByStatus();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((c) => c.toJSON?.() ?? c);
  }

  async getSizeById(id) {
    const result = await SizeDAO.findById(Number(id));
    if (!result) throw new NotFoundError("ID KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getSizeByName(value) {
    const result = await SizeDAO.findByName(value);
    if (!result) throw new NotFoundError("TÊN KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getSizeByCode(value) {
    const result = await SizeDAO.findByCode(value);
    if (!result) throw new NotFoundError("MÃ CODE KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { name, code } = data;

    const isValid = await isValidSlugInput(code);
    if (!isValid)
      throw new BadRequestError("MÃ KÍCH THƯỚC KHÔNG ĐÚNG ĐỊNH DẠNG");

    const [existingByName, existingByCode] = await Promise.all([
      SizeDAO.findByName(name),
      SizeDAO.findByCode(code),
    ]);

    if (existingByName) throw new ConflictError("TÊN NÀY ĐÃ TỒN TẠI");
    if (existingByCode) throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI");
  }

  async validateForUpdate(id, data) {
    const { name, code } = data;

    const isValid = await isValidSlugInput(code);
    if (!isValid)
      throw new BadRequestError("MÃ KÍCH THƯỚC KHÔNG ĐÚNG ĐỊNH DẠNG");

    const [existingByName, existingByCode] = await Promise.all([
      SizeDAO.findByName(name),
      SizeDAO.findByCode(code),
    ]);

    if (existingByName && Number(existingByName.size_id) !== Number(id))
      throw new ConflictError("TÊN KÍCH THƯỚC ĐÃ TỒN TẠI");
    if (existingByCode && Number(existingByCode.size_id) !== Number(id))
      throw new ConflictError("MÃ CODE ĐÃ TỒN TẠI");
  }

  async create(data) {
    await this.validateForCreate(data);

    const result = await SizeDAO.create(data);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async update(id, data) {
    const oldData = await this.getSizeById(id);
    await this.validateForUpdate(id, data);
    const isSame =
      oldData.name === data.name &&
      oldData.code === data.code &&
      oldData.type === data.type &&
      Number(oldData.displayOrder) === Number(data.displayOrder) &&
      Number(oldData.status) === Number(data.status);

    if (isSame) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await SizeDAO.update(Number(id), {
      ...data,
      displayOrder: Number(data.displayOrder),
      status: Number(data.status),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new SizeBUS();

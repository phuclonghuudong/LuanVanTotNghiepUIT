const PersonnelDAO = require("../repositories/personnel.repository");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");

class PersonnelBUS {
  async getAllPersonnel() {
    const result = await PersonnelDAO.findAllPersonnel();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getPersonnelById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await PersonnelDAO.findPersonnelById(id);
    if (!result || result.length === 0)
      throw new NotFoundError("NHÂN VIÊN KHÔNG TỒN TẠI ");

    return result.toJSON?.() ?? result;
  }

  async getPersonnelByAccountId(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await PersonnelDAO.findPersonnelByAccountId(id);
    if (!result || result.length === 0)
      throw new NotFoundError("TÀI KHOẢN NHÂN VIÊN KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getPersonnelByAccountIdLogin(id) {
    const result = await PersonnelDAO.findPersonnelByAccountId(id);

    return result ? result.toJSON?.() : null;
  }

  async createPersonnel(data) {
    const result = await PersonnelDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updatePersonnel(id, data) {
    const oldData = await this.getPersonnelById(id);

    const isUnchanged =
      oldData.fullname === data.fullname &&
      oldData.gender === data.gender &&
      oldData.cccd === data.cccd &&
      oldData.birthday === data.birthday &&
      oldData.address === data.address &&
      oldData.avatar === data.avatar;

    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await PersonnelDAO.update(Number(id), data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeletePersonnel(id) {
    await this.getPersonnelById(id);
    const result = await PersonnelDAO.softDeletePersonnel(id);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new PersonnelBUS();

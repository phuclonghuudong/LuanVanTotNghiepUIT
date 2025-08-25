const CustomerGroupDAO = require("../repositories/customerGroup.repository");
const { NotFoundError, ConflictError } = require("../utils/errors");

class CustomerGroupBUS {
  async getAllGroups() {
    const result = await CustomerGroupDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllActive() {
    const result = await CustomerGroupDAO.findByStatus1();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getCustomerGroupById(id) {
    const result = await CustomerGroupDAO.findById(Number(id));
    if (!result || result.length === 0)
      throw new NotFoundError("NHÓM KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getCustomerGroupByName(value) {
    const result = await CustomerGroupDAO.findByName(value);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TỒN TẠI DỮ LIỆU");

    return result;
  }

  async validateForCreate(value) {
    const existingName = await CustomerGroupDAO.findByName(value);
    if (existingName) throw new ConflictError("TÊN NHÓM ĐÃ TỒN TẠI");
  }

  async validateForUpdate(value, id) {
    const existingName = await CustomerGroupDAO.findByName(value);
    if (existingName && Number(existingName.group_id) !== Number(id))
      throw new ConflictError("TÊN NHÓM ĐÃ TỒN TẠI Ở DANH MỤC KHÁC");
  }

  async createCustomerGroup(data) {
    await this.validateForCreate(data.name);

    const result = await CustomerGroupDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCustomerGroup(id, data) {
    const oldData = await this.getCustomerGroupById(id);

    await this.validateForUpdate(data.name, id);

    const isUnchanged =
      oldData.group_name === data.name &&
      oldData.description === data.description &&
      Number(oldData.status) === Number(data.status);

    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await CustomerGroupDAO.update(Number(id), data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async deleteCustomerGroup(id) {
    await this.getCustomerGroupById(id);
    await CustomerGroupDAO.delete(Number(id));
  }
}

module.exports = new CustomerGroupBUS();

const CustomerDAO = require("../repositories/customer.repository");
const AccountBUS = require("../services/account.service");
const CustomerGroupBUS = require("../services/customerGroup.service");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");

class CustomerBUS {
  async getAllCustomer() {
    const result = await CustomerDAO.findAllCustomers();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getCustomerById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await CustomerDAO.findCustomerById(id);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÁCH HÀNG KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCustomerByAccountId(value) {
    const result = await CustomerDAO.findCustomerByAccount(value);
    if (!result || result.length === 0)
      throw new NotFoundError("TÀI KHOẢN KHÁCH HÀNG KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getCustomerByAccountIdLogin(value) {
    const result = await CustomerDAO.findCustomerByAccount(value);

    return result ? result.toJSON?.() : null;
  }

  async createCustomer(data) {
    const { accountId, groupId, status } = data;

    await AccountBUS.getAccountById(accountId);
    await CustomerGroupBUS.getCustomerGroupById(groupId);

    const existingAccountId = await CustomerDAO.findCustomerById(
      Number(accountId)
    );
    if (existingAccountId) throw new ConflictError("TÀI KHOẢN ĐÃ ĐƯỢC SỬ DỤNG");

    const result = await CustomerDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCustomer(id, data) {
    const oldData = await this.getCustomerById(id);

    const isChanged =
      oldData.fullname === data.fullname &&
      oldData.address === data.address &&
      oldData.avatar === data.avatar &&
      oldData.birthday === data.birthday &&
      oldData.gender === data.gender &&
      Number(oldData.group_id) === Number(data.groupId) &&
      Number(oldData.status) === Number(data.status);
    if (!isChanged) throw new ConflictError("DỮ LIỆU KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await CustomerDAO.update(Number(id), {
      ...data,
      status: Number(data.status),
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateCustomerByStatus(id, status) {
    const oldData = await this.getCustomerById(id);

    const isChanged = Number(oldData.status) === Number(status);
    if (!isChanged) throw new ConflictError("DỮ LIỆU KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await CustomerDAO.updateCustomerByStatus(id, status);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateInfoCustomer(id, data) {
    await this.getCustomerById(id);

    const result = await CustomerDAO.updateEditInfo(id, {
      ...data,
      gender: Number(data.gender),
    });

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteCustomer(id) {
    await this.getCustomerById(id);
    const result = await CustomerDAO.softDeleteCustomer(id);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new CustomerBUS();

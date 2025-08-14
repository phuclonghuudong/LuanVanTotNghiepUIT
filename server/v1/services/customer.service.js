const CustomerDAO = require("../repositories/customer.repository");
const AccountBUS = require("../services/account.service");
const CustomerGroupBUS = require("../services/customerGroup.service");
const { NotFoundError, ConflictError } = require("../utils/errors");

class CustomerBUS {
  async getAllCustomer() {
    const result = await CustomerDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getCustomerById(id) {
    const result = await CustomerDAO.findById(Number(id));
    if (!result || result.length === 0)
      throw new NotFoundError("ID KHÁCH HÀNG KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getCustomerByAccountId(value) {
    const result = await CustomerDAO.findByAccountId(Number(value));
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async createCustomer(data) {
    const { accountId, groupId, status } = data;

    await AccountBUS.getAccountById(accountId);
    await CustomerGroupBUS.getCustomerGroupById(groupId);

    const existingAccountId = await CustomerDAO.findByAccountId(
      Number(accountId)
    );
    if (existingAccountId) throw new ConflictError("TÀI KHOẢN ĐÃ ĐƯỢC SỬ DỤNG");

    const result = await CustomerDAO.create({
      ...data,
      account_id: Number(accountId),
      group_id: Number(groupId),
      status: Number(status),
    });

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

  async deleteCustomer(id) {
    await this.getCustomerById(id);
    await CustomerDAO.delete(Number(id));
  }
}

module.exports = new CustomerBUS();

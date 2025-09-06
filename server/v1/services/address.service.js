const AddressDAO = require("../repositories/address.repository");
const CustomerBUS = require("../services/customer.service");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");
const { validPhoneInput } = require("../utils/isValidateInput");

class AddressBUS {
  async getAllAddress() {
    const result = await AddressDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");
    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAddressById(id) {
    const result = await AddressDAO.findById(id);
    if (!result || result.length === 0)
      throw new NotFoundError("ĐỊA CHỈ KHÔNG TỒN TẠI ");

    return result.toJSON?.() ?? result;
  }

  async getAddressByCustomer(id) {
    const result = await AddressDAO.findByCustomerId(id);
    if (!result || result.length === 0)
      throw new NotFoundError("ĐỊA CHỈ KHÔNG TỒN TẠI ");

    return result.toJSON?.() ?? result;
  }

  async getAddressByIdAndCustomer(id, customer) {
    await CustomerBUS.getCustomerById(customer);

    const result = await AddressDAO.findByIdAndCustomer(id, customer);
    if (!result || result.length === 0)
      throw new NotFoundError("ĐỊA CHỈ KHÔNG TỒN TẠI ");

    return result.toJSON?.() ?? result;
  }

  async validateInput(data) {
    const { phone } = data;

    const isValidPhone = await validPhoneInput(phone);
    if (!isValidPhone)
      throw new BadRequestError("SỐ ĐIỆN THOẠI KHÔNG ĐÚNG ĐỊNH DẠNG");
  }

  async createAddress(customer, data) {
    await this.validateInput(data);

    await CustomerBUS.getCustomerById(customer);

    const result = await AddressDAO.create(data);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateAddress(user, id, data) {
    await this.getAddressByIdAndCustomer(id, user);
    await this.validateInput(data);

    const oldData = await this.getAddressById(id);

    const isChanged =
      oldData.fullname !== data.fullname ||
      oldData.address !== data.address ||
      oldData.isMain !== data.isMain ||
      oldData.phone !== data.phone ||
      Number(oldData.status) !== Number(data.status);

    if (!isChanged) throw new ConflictError("DỮ LIỆU KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await AddressDAO.update(id, data);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteAddress(id) {
    const checkId = await this.getAddressById(id);

    if (Number(checkId.status) === -1)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, DỮ LIỆU ĐÃ BỊ XÓA");

    const result = await AddressDAO.softDelete(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new AddressBUS();

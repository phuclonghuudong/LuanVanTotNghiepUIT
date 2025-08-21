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
    const result = await AddressDAO.findById(Number(id));
    if (!result || result.length === 0)
      throw new NotFoundError("ID KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getAddressByCustomer(id) {
    const result = await AddressDAO.findByCustomerId(Number(id));
    if (!result || result.length === 0)
      throw new NotFoundError("ID KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getAddressByIdAndCustomer(id, customer) {
    const result = await AddressDAO.findByIdAndCustomer(
      Number(id),
      Number(customer)
    );
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG THỂ THỰC HIỆN THAO TÁC NÀY");

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

    const result = await AddressDAO.create({
      ...data,
      customer_id: Number(customer),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateAddress(user, id, data) {
    await this.validateInput(data);
    await this.getAddressByIdAndCustomer(id, user);

    const oldData = await this.getAddressById(id);

    const isChanged =
      oldData.fullname !== data.fullname ||
      oldData.address !== data.address ||
      oldData.isMain !== data.isMain ||
      oldData.phone !== data.phone ||
      Number(oldData.status) !== Number(data.status);

    if (!isChanged) throw new ConflictError("DỮ LIỆU KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await AddressDAO.update(Number(id), {
      ...data,
      status: Number(data.status),
    });
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new AddressBUS();

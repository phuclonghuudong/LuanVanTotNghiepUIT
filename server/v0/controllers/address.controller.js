const { BadRequestError } = require("../utils/errors");
const AddressBUS = require("../services/address.service");
const responseHandler = require("../utils/responseHandler");

const getAddressById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await AddressBUS.getAddressById(id);

    responseHandler(res, 200, "THÔNG TIN", result);
  } catch (error) {
    next(error);
  }
};

const getAddressByCustomer = async (req, res, next) => {
  try {
    const user = req.user?.user;
    const result = await AddressBUS.getAddressByCustomer(user);

    responseHandler(res, 200, "THÔNG TIN", result);
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  const { fullname, phone, address, isMain, status } = req.body;
  console.log(isMain);

  if (!fullname?.trim() || !phone?.trim() || !address?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const payload = req.body;

    const user = req.user?.user;
    const result = await AddressBUS.createAddress(user, payload);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  const { fullname, phone, address, isMain, status } = req.body;
  const { id } = req.params;
  const user = req.user.user;

  if (!fullname?.trim() || !phone?.trim() || !address?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  if (!id)
    throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN ĐỊA CHỈ");
  if (!user)
    throw new BadRequestError("VUI LÒNG CUNG CẤP THÔNG TIN NGƯỜI DÙNG");

  try {
    const payload = req.body;
    const result = await AddressBUS.updateAddress(user, id, payload);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddressById,
  getAddressByCustomer,
  createAddress,
  updateAddress,
};

const CustomerBUS = require("../services/customer.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllCustomer = async (req, res, next) => {
  try {
    const result = await CustomerBUS.getAllCustomer();

    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐỦ THÔNG TIN");
  try {
    const result = await CustomerBUS.getCustomerById(id);

    responseHandler(res, 200, "THÔNG TIN VAI TRÒ", result);
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  const { fullname, gender, birthday, address, avatar, status } = req.body;
  if (!fullname.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const payload = req.body;
    const result = await CustomerBUS.createCustomer(payload);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  const { fullname, gender, birthday, address, avatar, status } = req.body;
  const { id } = req.params;
  if (!fullname.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const payload = req.body;
    const result = await CustomerBUS.updateCustomer(id, payload);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
};

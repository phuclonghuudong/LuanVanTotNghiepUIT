const CustomerGroupBUS = require("../services/customerGroup.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllCustomerGroup = async (req, res, next) => {
  try {
    const result = await CustomerGroupBUS.getAllGroups();

    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getCustomerGroupById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await CustomerGroupBUS.getCustomerGroupById(id);

    responseHandler(res, 200, "THÔNG TIN", result);
  } catch (error) {
    next(error);
  }
};

const createCustomerGroup = async (req, res, next) => {
  const { name, description, status } = req.body;
  if (!name.trim()) throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await CustomerGroupBUS.createCustomerGroup(req.body);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateCustomerGroup = async (req, res, next) => {
  const { name, description, status } = req.body;
  const { id } = req.params;
  if (!name.trim()) throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await CustomerGroupBUS.updateCustomerGroup(id, req.body);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomerGroup,
  getCustomerGroupById,
  createCustomerGroup,
  updateCustomerGroup,
};

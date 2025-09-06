const CustomerGroupBUS = require("../services/customerGroup.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllGroups = async (req, res, next) => {
  try {
    const result = await CustomerGroupBUS.getAllGroups();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getAllGroupActive = async (req, res, next) => {
  try {
    const result = await CustomerGroupBUS.getAllActive();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getGroupById = async (req, res, next) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await CustomerGroupBUS.getCustomerGroupById(id);
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const createGroup = async (req, res, next) => {
  const { name, description, status } = req.body || {};
  if (!name?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  try {
    const validInput = req.body;
    const result = await CustomerGroupBUS.createCustomerGroup(validInput);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateGroup = async (req, res, next) => {
  const { name, description, status } = req.body || {};
  const id = Number(req.params.id);

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }
  if (!name?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const validInput = req.body;
    const result = await CustomerGroupBUS.updateCustomerGroup(id, validInput);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const softDeleteGroup = async (req, res, next) => {
  const { id } = req.params;

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await CustomerGroupBUS.softDeleteGroup(id);

    responseHandler(res, 200, "XÓA DỮ LIỆU THÀNH CÔNG");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGroups,
  getAllGroupActive,
  getGroupById,
  createGroup,
  updateGroup,
  softDeleteGroup,
};

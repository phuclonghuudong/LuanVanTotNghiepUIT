const AddressBUS = require("../services/address.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllAddress = async (req, res, next) => {
  try {
    const result = await AddressBUS.getAllAddress();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getAllAddressActive = async (req, res, next) => {
  try {
    const result = await AddressBUS.getAllAddressActive();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getAddressById = async (req, res, next) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await AddressBUS.getAddressById(id);
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  const { fullname, phone, address, isMain, status } = req.body || {};

  if (!fullname?.trim() || !phone?.trim() || !address?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const validInput = req.body;
    const result = await AddressBUS.createAddress(validInput);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  const { fullname, phone, address, isMain, status } = req.body || {};
  const id = Number(req.params.id);

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }
  if (!fullname?.trim() || !phone?.trim() || !address?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const validInput = req.body;
    const result = await AddressBUS.updateAddress(id, validInput);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const softDeleteAddress = async (req, res, next) => {
  const id = Number(req.params.id);

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await AddressBUS.softDeleteAddress(id);

    responseHandler(res, 200, "XÓA DỮ LIỆU THÀNH CÔNG");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAddress,
  getAllAddressActive,
  getAddressById,
  createAddress,
  updateAddress,
  softDeleteAddress,
};

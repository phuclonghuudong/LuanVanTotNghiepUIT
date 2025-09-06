const SizeBUS = require("../services/size.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllSize = async (req, res, next) => {
  try {
    const result = await SizeBUS.getAllSize();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getAllSizeActive = async (req, res, next) => {
  try {
    const result = await SizeBUS.getAllSizeActive();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getSizeById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await SizeBUS.getSizeById(id);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getSizeByCode = async (req, res, next) => {
  const { code } = req.params;
  if (!code) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await SizeBUS.getSizeByCode(code);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const createSize = async (req, res, next) => {
  const { name, code, type, displayOrder } = req.body;
  if (!name?.trim() || !code?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await SizeBUS.create(req.body);
    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateSize = async (req, res, next) => {
  const { name, code, type, displayOrder } = req.body;
  const { id } = req.params;
  if (!name?.trim() || !code?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await SizeBUS.update(id, req.body);
    responseHandler(res, 201, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSize,
  getAllSizeActive,
  getSizeById,
  getSizeByCode,
  createSize,
  updateSize,
};

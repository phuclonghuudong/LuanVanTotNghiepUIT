const ColorBUS = require("../services/color.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllColor = async (req, res, next) => {
  try {
    const result = await ColorBUS.getAllColor();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getAllColorActive = async (req, res, next) => {
  try {
    const result = await ColorBUS.getAllColorActive();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getColorById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ColorBUS.getColorById(id);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getColorByCode = async (req, res, next) => {
  const { code } = req.params;
  if (!code) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ColorBUS.getColorByCode(code);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const createColor = async (req, res, next) => {
  const { name, code, displayOrder } = req.body;
  if (!name?.trim() || !code?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ColorBUS.create(req.body);
    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateColor = async (req, res, next) => {
  const { name, code, displayOrder } = req.body;
  const { id } = req.params;
  if (!name?.trim() || !code?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ColorBUS.update(id, req.body);
    responseHandler(res, 201, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllColor,
  getAllColorActive,
  getColorById,
  getColorByCode,
  createColor,
  updateColor,
};

const CategorySizeBUS = require("../services/categorySize.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const createCategorySize = async (req, res, next) => {
  const { categoryId, sizeId, description } = req.body;

  if (!categoryId?.trim() || !sizeId?.trim())
    throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  const result = await CategorySizeBUS.createCategorySize(req.body);

  responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  try {
  } catch (error) {
    next(error);
  }
};

const updateCategorySize = async (req, res, next) => {
  const { categoryId, sizeId, description } = req.body;
  const { id } = req.params;

  if (!categoryId?.trim() || !sizeId?.trim())
    throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  const result = await CategorySizeBUS.updateCategorySize(id, req.body);

  responseHandler(res, 201, "CẬP NHẬT THÀNH CÔNG", result);
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategorySize,
  updateCategorySize,
};

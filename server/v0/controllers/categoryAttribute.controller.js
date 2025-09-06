const CategoryAttributeBUS = require("../services/categoryAttribute.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const createCategoryAttribute = async (req, res, next) => {
  const { categoryId, attributeId, description } = req.body;

  if (!categoryId?.trim() || !attributeId?.trim())
    throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  const result = await CategoryAttributeBUS.createCategoryAttribute(req.body);

  responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  try {
  } catch (error) {
    next(error);
  }
};

const updateCategoryAttribute = async (req, res, next) => {
  const { categoryId, attributeId, description } = req.body;
  const { id } = req.params;

  if (!categoryId?.trim() || !attributeId?.trim())
    throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  const result = await CategoryAttributeBUS.updateCategoryAttribute(
    id,
    req.body
  );

  responseHandler(res, 201, "CẬP NHẬT THÀNH CÔNG", result);
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategoryAttribute,
  updateCategoryAttribute,
};

const AttributeBUS = require("../services/attribute.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllAttribute = async (req, res, next) => {
  try {
    const result = await AttributeBUS.getAllAttribute();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getAllAttributeActive = async (req, res, next) => {
  try {
    const result = await AttributeBUS.getAllAttributeActive();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getAttributeById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await AttributeBUS.getAttributeById(id);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "THÔNG TIN THUỘC TÍNH ", result);
  } catch (error) {
    next(error);
  }
};

const getAttributeBySlug = async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await AttributeBUS.getAttributeBySlug(slug);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "THÔNG TIN THUỘC TÍNH ", result);
  } catch (error) {
    next(error);
  }
};

const createAttribute = async (req, res, next) => {
  const { name, slug, type, isCustom, status } = req.body;

  if (!name?.trim() || !slug?.trim() || !type?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");

  try {
    const result = await AttributeBUS.createAttribute(req.body);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateAttribute = async (req, res, next) => {
  const { name, slug, type, isCustom, status } = req.body;
  const { id } = req.params;

  if (!name?.trim() || !slug?.trim() || !type?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await AttributeBUS.updateAttribute(id, req.body);

    responseHandler(res, 201, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAttribute,
  getAllAttributeActive,
  getAttributeById,
  getAttributeBySlug,
  createAttribute,
  updateAttribute,
};

const CategoryBUS = require("../services/category.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllCategories = async (req, res, next) => {
  try {
    const result = await CategoryBUS.getAllCategories();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getAllCategoryActive = async (req, res, next) => {
  try {
    const result = await CategoryBUS.getAllCategoryActive();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await CategoryBUS.getCategoryById(id);
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  const slug = req.params.slug;

  if (!slug) {
    throw new BadRequestError(
      "ĐỊNH DANH KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await CategoryBUS.getCategoryBySlug(slug);
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { slug, name, description, imageUrl, status } = req.body || {};
  if (!slug?.trim() || !name?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  try {
    const validInput = req.body;
    const result = await CategoryBUS.createCategory(validInput);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { slug, name, description, imageUrl, status } = req.body || {};
  const id = Number(req.params.id);

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }
  if (!slug?.trim() || !name?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const validInput = req.body;
    const result = await CategoryBUS.updateCategory(id, validInput);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const softDeleteCategory = async (req, res, next) => {
  const id = Number(req.params.id);

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await CategoryBUS.softDeleteCategory(id);

    responseHandler(res, 200, "XÓA DỮ LIỆU THÀNH CÔNG");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getAllCategoryActive,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  softDeleteCategory,
};

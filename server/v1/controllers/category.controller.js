const CategoryBUS = require("../services/category.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler"); // nếu bạn có custom handler

const getAllCategory = async (req, res, next) => {
  try {
    const result = await CategoryBUS.getAllCategories();

    responseHandler(res, 200, "DANH SÁCH LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await CategoryBUS.getCategoryById(id);

    responseHandler(res, 200, "THÔNG TIN LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN!");

  try {
    const result = await CategoryBUS.getCategoryBySlug(slug);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TỒN TẠI DỮ LIỆU");

    responseHandler(res, 200, "THÔNG TIN LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { name, slug, description, imageUrl, status } = req.body;
  if (!name?.trim() || !slug?.trim()) {
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
  }

  try {
    const newCategory = await CategoryBUS.createCategory({
      name,
      slug,
      description,
      imageUrl,
      status,
    });

    responseHandler(res, 201, "THÊM THÀNH CÔNG", newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { name, slug, description, imageUrl, status } = req.body;
  const { id } = req.params;

  if (!name?.trim() || !slug?.trim()) {
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
  }

  if (!id) throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");
  try {
    const updateCategory = await CategoryBUS.updateCategory(id, {
      name,
      slug,
      description,
      imageUrl,
      status,
    });

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", updateCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
};

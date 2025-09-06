const CategoryProductBUS = require("../services/categoryProduct.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler"); // nếu bạn có custom handler

const getAllCategoryProduct = async (req, res, next) => {
  try {
    const result = await CategoryProductBUS.getAllCategoryProduct();

    responseHandler(res, 200, "DANH SÁCH LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const getAllCategoryStatusEqual1 = async (req, res, next) => {
  try {
    const result = await CategoryProductBUS.getAllCategoryProductActive();

    responseHandler(res, 200, "DANH SÁCH LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const getCategoryProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await CategoryProductBUS.getCategoryProductById(id);

    responseHandler(res, 200, "THÔNG TIN LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const getCategoryProductBySlug = async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN!");

  try {
    const result = await CategoryProductBUS.getCategoryProductBySlug(slug);
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TỒN TẠI DỮ LIỆU");

    responseHandler(res, 200, "THÔNG TIN LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const createCategoryProduct = async (req, res, next) => {
  const { name, slug, description, imageUrl, status, categoryId } = req.body;
  if (!name?.trim() || !slug?.trim() || !categoryId?.trim()) {
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
  }

  try {
    const newCategory = await CategoryProductBUS.createCategoryProduct({
      categoryId,
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

const updateCategoryProduct = async (req, res, next) => {
  const { name, slug, description, imageUrl, status, categoryId } = req.body;
  const { id } = req.params;

  if (!name?.trim() || !slug?.trim() || !categoryId?.trim()) {
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
  }

  if (!id) throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");
  try {
    const updateCategory = await CategoryProductBUS.updateCategoryProduct(
      id,
      req.body
    );

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", updateCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategoryProduct,
  getAllCategoryStatusEqual1,
  getCategoryProductById,
  getCategoryProductBySlug,
  createCategoryProduct,
  updateCategoryProduct,
};

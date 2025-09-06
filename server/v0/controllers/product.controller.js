const ProductBUS = require("../services/product.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllProduct = async (req, res, next) => {
  try {
    const result = await ProductBUS.getAllProduct();

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getAllProductActive = async (req, res, next) => {
  try {
    const result = await ProductBUS.getAllProductActive();

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ProductBUS.getProductById(id);

    responseHandler(res, 200, "THÔNG TIN ", result);
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ProductBUS.getProductBySlug(slug);

    responseHandler(res, 200, "THÔNG TIN ", result);
  } catch (error) {
    next(error);
  }
};

const getProductBySku = async (req, res, next) => {
  const { sku } = req.params;
  if (!sku) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ProductBUS.getProductBySku(sku);

    responseHandler(res, 200, "THÔNG TIN ", result);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { brandId, categoryId, sku, slug, name, status, description } =
    req.body;
  if (
    !brandId?.trim() ||
    !categoryId?.trim() ||
    !sku?.trim() ||
    !slug?.trim() ||
    !name?.trim()
  )
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ProductBUS.createProduct(req.body);
    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  const { brandId, categoryId, sku, slug, name, status, description } =
    req.body;
  if (
    !brandId?.trim() ||
    !categoryId?.trim() ||
    !sku?.trim() ||
    !slug?.trim() ||
    !name?.trim()
  )
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");
  try {
    const result = await ProductBUS.updateProduct(id, req.body);
    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProduct,
  getAllProductActive,
  getProductById,
  getProductBySlug,
  getProductBySku,
  createProduct,
  updateProduct,
};

const BrandBUS = require("../services/brand.service");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllBrand = async (req, res, next) => {
  try {
    const result = await BrandBUS.getAllBrand();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getAllBrandActive = async (req, res, next) => {
  try {
    const result = await BrandBUS.getAllActive();
    if (!result || result.length === 0)
      throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

    responseHandler(res, 200, "DANH SÁCH ", result);
  } catch (error) {
    next(error);
  }
};

const getBrandById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");
  try {
    const result = await BrandBUS.getBrandById(id);

    responseHandler(res, 200, "THÔNG TIN THƯƠNG HIỆU", result);
  } catch (error) {
    next(error);
  }
};

const getBrandBySlug = async (req, res, next) => {
  const { slug } = req.params;
  if (!slug?.trim())
    throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await BrandBUS.getBrandBySlug(slug);

    responseHandler(res, 200, "THÔNG TIN THƯƠNG HIỆU", result);
  } catch (error) {
    next(error);
  }
};

const createBrand = async (req, res, next) => {
  const { name, slug, description, imageUrl, status } = req.body;

  if (!name?.trim() || !slug?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");

  try {
    const result = await BrandBUS.createBrand({
      name,
      slug,
      description,
      imageUrl,
      status,
    });

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  const { name, slug, description, imageUrl, status } = req.body;
  const { id } = req.params;

  if (!name?.trim() || !slug?.trim()) {
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
  }
  if (!id) throw new NotFoundError("KHÔNG TÌM THẤY DỮ LIỆU");

  try {
    const result = await BrandBUS.updateBrand(id, {
      name,
      slug,
      description,
      imageUrl,
      status,
    });

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrand,
  getAllBrandActive,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
};

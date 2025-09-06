const ImageProductBUS = require("../services/imageProduct.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const createImageProduct = async (req, res, next) => {
  const { productId, imageUrl } = req.body;

  if (!productId?.trim() || !imageUrl?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ImageProductBUS.createImageProduct(req.body);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateImageProduct = async (req, res, next) => {
  const { productId, imageUrl } = req.body;
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  if (!productId?.trim() || !imageUrl?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await ImageProductBUS.updateImageProduct(id, req.body);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createImageProduct,
  updateImageProduct,
};

const { BadRequestError } = require("../utils/errors");
const UploadBUS = require("../services/upload.service");
const responseHandler = require("../utils/responseHandler");

const uploadImageAvatar = async (req, res, next) => {
  const file = req.file;
  if (!file) throw new BadRequestError("VUI LÒNG CUNG CẤP HÌNH ẢNH");
  try {
    const result = await UploadBUS.uploadImage(file);

    responseHandler(res, 200, "THAO TÁC THÀNH CÔNG", { url: result });
  } catch (error) {
    next(error);
  }
};

const uploadImageProduct = async (req, res, next) => {
  const file = req.file;
  if (!file) throw new BadRequestError("VUI LÒNG CUNG CẤP HÌNH ẢNH");
  try {
    const result = await UploadBUS.uploadImage(file);

    responseHandler(res, 200, "THAO TÁC THÀNH CÔNG", { url: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImageAvatar,
  uploadImageProduct,
};

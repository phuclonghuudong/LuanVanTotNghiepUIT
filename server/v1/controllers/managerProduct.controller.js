const ManagerProductBUS = require("../services/managerProduct.service");
const responseHandler = require("../utils/responseHandler");

const getAllListProduct = async (req, res, next) => {
  try {
    const result = await ManagerProductBUS.getAllProduct();
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllListProduct,
};

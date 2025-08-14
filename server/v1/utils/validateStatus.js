const { BadRequestError } = require("./errors");

const validateAccountStatus = async (status) => {
  switch (status) {
    case 3: // inactive
      throw new BadRequestError("TÀI KHOẢN ĐANG BỊ VÔ HIỆU HÓA");
    case 2: // pending
      throw new BadRequestError("TÀI KHOẢN CHƯA XÁC NHẬN");
    case 0: // suspended
      throw new BadRequestError("TÀI KHOẢN ĐANG BỊ KHÓA");
    case -1: // deleted
      throw new BadRequestError("TÀI KHOẢN ĐÃ BỊ XÓA");
    case 1: // active
      return true;
    default:
      throw new BadRequestError("TRẠNG THÁI TÀI KHOẢN KHÔNG HỢP LỆ");
  }
};

const validateCategoryStatus = async (status) => {
  switch (status) {
    case 0: // suspended
      throw new BadRequestError("ĐANG BỊ KHÓA");
    case -1: // deleted
      throw new BadRequestError("ĐÃ BỊ XÓA");
    case 1: // active
      return true;
    default:
      throw new BadRequestError("TRẠNG THÁI KHÔNG HỢP LỆ");
  }
};

module.exports = { validateAccountStatus, validateCategoryStatus };

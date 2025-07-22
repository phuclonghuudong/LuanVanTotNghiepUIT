const MauSacService = require("../services/MauSac.service");
const { responseHandler } = require("../utils/responseHandler");

const getAllList = async (req, res, next) => {
  try {
    const result = await MauSacService.getAllList();
    if (!result)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    responseHandler(res, 200, "DANH SÁCH TẤT CẢ", result);
  } catch (error) {
    next(error);
  }
};

const getDetailById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id)
      return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);

    const result = await MauSacService.getDetailById();
    if (!result)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    responseHandler(res, 200, "CHI TIẾT MÀU SẮC", result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { tenMauSac, maMauSac, hexCode, moTa, trangThai } = req.body;
  try {
    if (!tenMauSac || !maMauSac || !hexCode) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }

    const checkExistTen = await MauSacService.findMauSacByTenMau(tenMauSac);
    const checkExistMa = await MauSacService.findMauSacByMaMau(maMauSac);
    const checkExistHexCode = await MauSacService.findMauSacByHexCode(hexCode);
    if (checkExistTen || checkExistMa || checkExistHexCode) {
      return responseHandler(res, 409, "MÀU SẮC ĐÃ TỒN TẠI!", null, true);
    }

    const result = await MauSacService.createMauSac({
      tenMauSac,
      maMauSac,
      hexCode: hexCode.trim(),
      moTa,
      trangThai: Number(trangThai),
    });
    if (!result) {
      return responseHandler(res, 409, "THÊM MỚI THẤT BẠI!", null, true);
    }

    responseHandler(res, 201, "THÊM MỚI THÀNH CÔNG!", result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { tenMauSac, maMauSac, hexCode, moTa, trangThai } = req.body;
  const { id } = req.params;

  if (!id) return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);
  try {
    const findById = await MauSacService.getDetailById(id);

    const idUpdate = findById?.id;
    if (!idUpdate)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    if (!tenMauSac || !maMauSac || !hexCode) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }

    const checkExistTen = await MauSacService.checkTenMauExistsExcludeId(
      tenMauSac,
      idUpdate
    );
    const checkExistMa = await MauSacService.checkMaMauExistsExcludeId(
      maMauSac,
      idUpdate
    );
    const checkExistHexCode = await MauSacService.checkHexCodeExistsExcludeId(
      hexCode,
      idUpdate
    );
    if (checkExistTen || checkExistMa || checkExistHexCode) {
      return responseHandler(res, 409, "MÀU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await MauSacService.updateMauSac(idUpdate, {
      tenMauSac,
      maMauSac,
      hexCode: hexCode.trim(),
      moTa,
      trangThai: Number(trangThai),
    });
    if (!result) {
      return responseHandler(res, 409, "CẬP NHẬT THẤT BẠI!", null, true);
    }

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG!", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllList,
  getDetailById,
  create,
  update,
};

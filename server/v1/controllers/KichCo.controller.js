const KichCoService = require("../services/KichCo.service");
const { responseHandler } = require("../utils/responseHandler");

const getAllList = async (req, res, next) => {
  try {
    const result = await KichCoService.getAllList();
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

    const result = await KichCoService.getDetailById();
    if (!result)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    responseHandler(res, 200, "CHI TIẾT MÀU SẮC", result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { tenKichCo, maKichCo, moTa, trangThai } = req.body;
  try {
    if (!tenKichCo || !maKichCo) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }

    const checkExistTen = await KichCoService.findByTen(tenKichCo);
    const checkExistMa = await KichCoService.findByMa(maKichCo);
    if (checkExistTen || checkExistMa) {
      return responseHandler(res, 409, "DỮ LIỆU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await KichCoService.createKichCo({
      tenKichCo,
      maKichCo,
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
  const { tenKichCo, maKichCo, moTa, trangThai } = req.body;
  const { id } = req.params;

  if (!id) return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);
  try {
    const findById = await KichCoService.getDetailById(id);

    const idUpdate = findById?.id;
    if (!idUpdate)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    if (!tenKichCo || !maKichCo) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }

    const checkExistTen = await KichCoService.checkTenExistsExcludeId(
      tenKichCo,
      idUpdate
    );
    const checkExistMa = await KichCoService.checkMaExistsExcludeId(
      maKichCo,
      idUpdate
    );
    if (checkExistTen || checkExistMa) {
      return responseHandler(res, 409, "DỮ LIỆU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await KichCoService.updateKichCo(idUpdate, {
      tenKichCo,
      maKichCo,
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

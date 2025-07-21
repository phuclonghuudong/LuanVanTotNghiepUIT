const ThuongHieuService = require("../services/ThuongHieu.service");
const { responseHandler } = require("../utils/responseHandler");

const getAllThuongHieu = async (req, res, next) => {
  try {
    const result = await ThuongHieuService.getAllList();
    if (!result)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    responseHandler(res, 200, "DANH SÁCH TẤT CẢ LOẠI SÂN", result);
  } catch (error) {
    next(error);
  }
};

const getDetailById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id)
      return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);

    const result = await ThuongHieuService.getDetailById(id);
    if (!result)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    responseHandler(res, 200, "CHI TIẾT THƯƠNG HIỆU", result);
  } catch (error) {
    next(error);
  }
};

const createThuongHieu = async (req, res, next) => {
  const { tenthuonghieu, slugthuonghieu, hinhanh, mota, trangthai } = req.body;
  try {
    if (!tenthuonghieu?.trim() || !slugthuonghieu?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTen =
      await ThuongHieuService.findThuongHieuByTenThuongHieu(tenthuonghieu);
    const checkExistSlug =
      await ThuongHieuService.findThuongHieuBySlugThuongHieu(slugthuonghieu);

    if (checkExistTen || checkExistSlug) {
      return responseHandler(res, 409, "THƯƠNG HIỆU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await ThuongHieuService.createThuongHieu({
      tenthuonghieu: tenthuonghieu,
      slugthuonghieu: slugthuonghieu.trim(),
      hinhanh,
      mota,
      trangthai: Number(trangthai),
    });
    if (!result) {
      return responseHandler(res, 409, "THÊM MỚI THẤT BẠI!", null, true);
    }

    responseHandler(res, 201, "THÊM MỚI THÀNH CÔNG!", result);
  } catch (error) {
    next(error);
  }
};

const updateThuongHieu = async (req, res, next) => {
  const { tenthuonghieu, slugthuonghieu, hinhanh, mota, trangthai } = req.body;
  const { id } = req.params;

  if (!id) return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);
  try {
    const findById = await ThuongHieuService.getDetailById(id);
    const idUpdate = findById?.id_thuonghieu;
    if (!idUpdate)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    if (!tenthuonghieu?.trim() || !slugthuonghieu?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTen =
      await ThuongHieuService.checkTenThuongHieuExistsExcludeId(
        tenthuonghieu,
        idUpdate
      );
    const checkExistSlug =
      await ThuongHieuService.checkTenThuongHieuExistsExcludeId(
        slugthuonghieu,
        idUpdate
      );

    if (checkExistTen || checkExistSlug) {
      return responseHandler(res, 409, "THƯƠNG HIỆU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await ThuongHieuService.updateThuongHieu(idUpdate, {
      tenthuonghieu: tenthuonghieu,
      slugthuonghieu: slugthuonghieu.trim(),
      hinhanh,
      mota,
      trangthai: Number(trangthai),
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
  getAllThuongHieu,
  getDetailById,
  createThuongHieu,
  updateThuongHieu,
};

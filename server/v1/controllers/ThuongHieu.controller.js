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
  const { tenThuongHieu, slugThuongHieu, hinhAnh, moTa, trangThai } = req.body;
  try {
    if (!tenThuongHieu?.trim() || !slugThuongHieu?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTen =
      await ThuongHieuService.findThuongHieuByTenThuongHieu(tenThuongHieu);
    const checkExistSlug =
      await ThuongHieuService.findThuongHieuBySlugThuongHieu(slugThuongHieu);

    if (checkExistTen || checkExistSlug) {
      return responseHandler(res, 409, "THƯƠNG HIỆU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await ThuongHieuService.createThuongHieu({
      tenThuongHieu: tenThuongHieu,
      slugThuongHieu: slugThuongHieu.trim(),
      hinhAnh,
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

const updateThuongHieu = async (req, res, next) => {
  const { tenThuongHieu, slugThuongHieu, hinhAnh, moTa, trangThai } = req.body;
  const { id } = req.params;

  if (!id) return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);
  try {
    const findById = await ThuongHieuService.getDetailById(id);
    const idUpdate = findById?.id;
    if (!idUpdate)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    if (!tenThuongHieu?.trim() || !slugThuongHieu?.trim()) {
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
        tenThuongHieu,
        idUpdate
      );
    const checkExistSlug =
      await ThuongHieuService.checkTenThuongHieuExistsExcludeId(
        slugThuongHieu,
        idUpdate
      );

    if (checkExistTen || checkExistSlug) {
      return responseHandler(res, 409, "THƯƠNG HIỆU ĐÃ TỒN TẠI!", null, true);
    }

    const result = await ThuongHieuService.updateThuongHieu(idUpdate, {
      tenThuongHieu: tenThuongHieu,
      slugThuongHieu: slugThuongHieu.trim(),
      hinhAnh,
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
  getAllThuongHieu,
  getDetailById,
  createThuongHieu,
  updateThuongHieu,
};

const LoaiSanPhamService = require("../services/LoaiSanPham.service");
const { responseHandler } = require("../utils/responseHandler");

const getAllList = async (req, res, next) => {
  try {
    const result = await LoaiSanPhamService.getAllList();
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

    const result = await LoaiSanPhamService.getDetailById(id);
    if (!result)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    responseHandler(res, 200, "CHI TIẾT LOẠI SẢN PHẨM", result);
  } catch (error) {
    next(error);
  }
};

const createLoaiSanPham = async (req, res, next) => {
  const { tenLoai, slugLoai, hinhAnh, moTa, trangThai } = req.body;
  try {
    if (!tenLoai?.trim() || !slugLoai?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTenLoai =
      await LoaiSanPhamService.findLoaiSanPhamByTenLoai(tenLoai);
    const checkExistSlugLoai =
      await LoaiSanPhamService.findLoaiSanPhamBySlugLoai(slugLoai);

    if (checkExistTenLoai || checkExistSlugLoai) {
      return responseHandler(res, 409, "LOẠI SẢN PHẨM ĐÃ TỒN TẠI!", null, true);
    }

    const result = await LoaiSanPhamService.createLoaiSanPham({
      tenLoai: tenLoai,
      slugLoai: slugLoai.trim(),
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

const updateLoaiSanPham = async (req, res, next) => {
  const { tenLoai, slugLoai, hinhAnh, moTa, trangThai } = req.body;
  const { id } = req.params;

  if (!id) return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);
  try {
    const findById = await LoaiSanPhamService.getDetailById(id);
    const idUpdate = findById?.id;
    if (!idUpdate)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    if (!tenLoai?.trim() || !slugLoai?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTenLoai =
      await LoaiSanPhamService.checkTenLoaiExistsExcludeId(tenLoai, idUpdate);
    const checkExistSlugLoai =
      await LoaiSanPhamService.checkSlugLoaiExistsExcludeId(slugLoai, idUpdate);

    if (checkExistTenLoai || checkExistSlugLoai) {
      return responseHandler(res, 409, "LOẠI SẢN PHẨM ĐÃ TỒN TẠI!", null, true);
    }

    const result = await LoaiSanPhamService.updateLoaiSanPham(idUpdate, {
      tenLoai: tenLoai,
      slugLoai: slugLoai.trim(),
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
  getAllList,
  getDetailById,
  createLoaiSanPham,
  updateLoaiSanPham,
};

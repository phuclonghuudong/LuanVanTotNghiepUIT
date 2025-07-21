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
  const { tenloai, slugloai, hinhanh, mota, trangthai } = req.body;
  try {
    if (!tenloai?.trim() || !slugloai?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTenLoai =
      await LoaiSanPhamService.findLoaiSanPhamByTenLoai(tenloai);
    const checkExistSlugLoai =
      await LoaiSanPhamService.findLoaiSanPhamBySlugLoai(slugloai);

    if (checkExistTenLoai || checkExistSlugLoai) {
      return responseHandler(res, 409, "LOẠI SẢN PHẨM ĐÃ TỒN TẠI!", null, true);
    }

    const result = await LoaiSanPhamService.createLoaiSanPham({
      tenloai: tenloai,
      slugloai: slugloai.trim(),
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

const updateLoaiSanPham = async (req, res, next) => {
  const { tenloai, slugloai, hinhanh, mota, trangthai } = req.body;
  const { id } = req.params;

  if (!id) return responseHandler(res, 400, "KHÔNG TÌM THẤY DATA!", null, true);
  try {
    const findById = await LoaiSanPhamService.getDetailById(id);
    const idUpdate = findById?.id_loai;
    if (!idUpdate)
      return responseHandler(res, 404, "KHÔNG TỒN TẠI DATA!", null, true);

    if (!tenloai?.trim() || !slugloai?.trim()) {
      return responseHandler(
        res,
        400,
        "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!",
        null,
        true
      );
    }
    const checkExistTenLoai =
      await LoaiSanPhamService.checkTenLoaiExistsExcludeId(tenloai, idUpdate);
    const checkExistSlugLoai =
      await LoaiSanPhamService.checkSlugLoaiExistsExcludeId(slugloai, idUpdate);

    if (checkExistTenLoai || checkExistSlugLoai) {
      return responseHandler(res, 409, "LOẠI SẢN PHẨM ĐÃ TỒN TẠI!", null, true);
    }

    const result = await LoaiSanPhamService.updateLoaiSanPham(idUpdate, {
      tenloai: tenloai,
      slugloai: slugloai.trim(),
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
  getAllList,
  getDetailById,
  createLoaiSanPham,
  updateLoaiSanPham,
};

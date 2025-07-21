const express = require("express");
const router = express.Router();

// API MAIN
const BASE_PATH = "/api/v1";

// API
const thuongHieuRoutes = require("./ThuongHieu.routes");
const loaiSanPhamRoutes = require("./LoaiSanPham.routes");

// TEST
router.get(BASE_PATH, (req, res) => {
  res.send("Run Server!");
});

// ROUTES
router.use(`${BASE_PATH}/thuong-hieu`, thuongHieuRoutes);
router.use(`${BASE_PATH}/loai-san-pham`, loaiSanPhamRoutes);

module.exports = router;

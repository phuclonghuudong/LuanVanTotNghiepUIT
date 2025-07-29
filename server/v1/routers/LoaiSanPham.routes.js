const express = require("express");
const router = express.Router();
const {
  getAllList,
  getDetailById,
  createLoaiSanPham,
  updateLoaiSanPham,
} = require("../controllers/LoaiSanPham.controller");

router.get(`/`, getAllList);
router.get(`/:id`, getDetailById);
router.post(`/create`, createLoaiSanPham);
router.put(`/update/:id`, updateLoaiSanPham);

module.exports = router;

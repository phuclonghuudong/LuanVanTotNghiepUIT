const express = require("express");
const router = express.Router();
const {
  getAllThuongHieu,
  getDetailById,
  createThuongHieu,
  updateThuongHieu,
} = require("../controllers/ThuongHieu.controller");

router.get(`/`, getAllThuongHieu);
router.get(`/:id`, getDetailById);
router.post(`/create`, createThuongHieu);
router.put(`/update/:id`, updateThuongHieu);

module.exports = router;

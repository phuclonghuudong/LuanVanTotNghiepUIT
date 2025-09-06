const express = require("express");
const router = express.Router();
const {
  getAllSize,
  getAllSizeActive,
  getSizeById,
  getSizeByCode,
  createSize,
  updateSize,
} = require("../controllers/size.controller");

// const PATH = "/size";

router.get(`/all`, getAllSize);
router.get(`/active`, getAllSizeActive);
router.get(`/:id`, getSizeById);
router.get(`/detail/:code`, getSizeByCode);
router.post(`/`, createSize);
router.put(`/:id`, updateSize);

module.exports = router;

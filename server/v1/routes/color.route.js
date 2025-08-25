const express = require("express");
const router = express.Router();
const {
  getAllColor,
  getAllColorActive,
  getColorById,
  getColorByCode,
  createColor,
  updateColor,
} = require("../controllers/color.controller");

// const PATH = "/color";

router.get(`/all`, getAllColor);
router.get(`/active`, getAllColorActive);
router.get(`/:id`, getColorById);
router.get(`/detail/:code`, getColorByCode);
router.post(`/`, createColor);
router.put(`/:id`, updateColor);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  getBrandBySlug,
} = require("../controllers/brand.controller");

// const PATH = "/brand";

router.get(`/`, getAllBrand);
router.get(`/:id`, getBrandById);
router.get(`/detail/:slug`, getBrandBySlug);
router.post(`/`, createBrand);
router.put(`/:id`, updateBrand);

module.exports = router;

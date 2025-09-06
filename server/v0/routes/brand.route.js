const express = require("express");
const router = express.Router();
const {
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  getBrandBySlug,
  getAllBrandActive,
} = require("../controllers/brand.controller");

// const PATH = "/brand";

router.get(`/all`, getAllBrand);
router.get(`/active`, getAllBrandActive);
router.get(`/:id`, getBrandById);
router.get(`/detail/:slug`, getBrandBySlug);
router.post(`/`, createBrand);
router.put(`/:id`, updateBrand);

module.exports = router;

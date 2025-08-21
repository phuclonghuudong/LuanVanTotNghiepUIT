const express = require("express");
const router = express.Router();
const {
  getAllCategoryStatusEqual1,
  getAllCategoryProduct,
  getCategoryProductById,
  getCategoryProductBySlug,
  createCategoryProduct,
  updateCategoryProduct,
} = require("../controllers/categoryProduct.controller");

// const PATH = "/category-product";

router.get(`/all`, getAllCategoryProduct);
router.get(`/active`, getAllCategoryStatusEqual1);
router.get(`/:id`, getCategoryProductById);
router.get(`/detail/:slug`, getCategoryProductBySlug);
router.post(`/`, createCategoryProduct);
router.put(`/:id`, updateCategoryProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  getCategoryBySlug,
} = require("../controllers/category.controller");

// const PATH = "/category";

router.get(`/`, getAllCategory);
router.get(`/:id`, getCategoryById);
router.get(`/detail/:slug`, getCategoryBySlug);
router.post(`/`, createCategory);
router.put(`/:id`, updateCategory);

module.exports = router;

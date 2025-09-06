const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllCategories,
  getAllCategoryActive,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  softDeleteCategory,
} = require("../controllers/category.controller");

// const PATH = "/catalog-control/category";

const roleManagement = ["ADMIN", "PERSONNEL"];

router.get(`/`, getAllCategories);
router.get(`/active`, getAllCategoryActive);
router.get(`/slug/:slug`, getCategoryBySlug);
router.get(`/:id`, getCategoryById);

router.use(authenticate, authorizeRole(...roleManagement));

router.post(`/`, createCategory);
router.put(`/:id`, updateCategory);
router.patch(`/delete/:id`, softDeleteCategory);

module.exports = router;

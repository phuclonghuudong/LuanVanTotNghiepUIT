const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllCategoryProduct,
  getAllCategoryProductActive,
  getCategoryProductBySlug,
  getCategoryProductById,
  createCategoryProduct,
  updateCategoryProduct,
  softDeleteCategoryProduct,
} = require("../controllers/categoryProduct.controller");

// const PATH = "/catalog-control/category-product";

const roleManagement = ["ADMIN", "PERSONNEL"];

router.get(`/`, getAllCategoryProduct);
router.get(`/active`, getAllCategoryProductActive);
router.get(`/slug/:slug`, getCategoryProductBySlug);
router.get(`/:id`, getCategoryProductById);

router.use(authenticate, authorizeRole(...roleManagement));

router.post(`/`, createCategoryProduct);
router.put(`/:id`, updateCategoryProduct);
router.patch(`/delete/:id`, softDeleteCategoryProduct);

module.exports = router;

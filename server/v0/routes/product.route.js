const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getAllProductActive,
  getProductById,
  getProductBySlug,
  getProductBySku,
  createProduct,
  updateProduct,
} = require("../controllers/product.controller");

const {
  createImageProduct,
  updateImageProduct,
} = require("../controllers/imageProduct.controller");
const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

// const PATH = "/product";

router.get(`/all`, getAllProduct);
router.get(`/active`, getAllProductActive);
router.get(`/:id`, getProductById);
router.get(`/slug/:slug`, getProductBySlug);
router.get(`/sku/:sku`, getProductBySku);

const role = ["ADMIN", "PERSONNEL"];
router.post(`/`, authenticate, authorizeRole(role), createProduct);
router.put(`/:id`, authenticate, authorizeRole(role), updateProduct);

router.post(`/image`, authenticate, authorizeRole(role), createImageProduct);
router.post(
  `/image/:id`,
  authenticate,
  authorizeRole(role),
  updateImageProduct
);

module.exports = router;

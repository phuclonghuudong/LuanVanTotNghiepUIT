const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllListProduct,
} = require("../controllers/managerProduct.controller");

// const PATH = "/product";

const roleManagement = ["ADMIN", "PERSONNEL"];

router.get(`/`, getAllListProduct);

module.exports = router;

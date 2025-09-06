const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllSize,
  getAllSizeActive,
  getSizeByCode,
  getSizeById,
  createSize,
  updateSize,
  softDeleteSize,
} = require("../controllers/size.controller");

// const PATH = "/catalog-control/size";

const roleManagement = ["ADMIN", "PERSONNEL"];

router.get(`/`, getAllSize);
router.get(`/active`, getAllSizeActive);
router.get(`/code/:code`, getSizeByCode);
router.get(`/:id`, getSizeById);

router.use(authenticate, authorizeRole(...roleManagement));

router.post(`/`, createSize);
router.put(`/:id`, updateSize);
router.patch(`/delete/:id`, softDeleteSize);

module.exports = router;

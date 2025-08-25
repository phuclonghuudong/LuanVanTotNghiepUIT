const express = require("express");
const router = express.Router();
const {
  getAllAttribute,
  getAllAttributeActive,
  getAttributeById,
  getAttributeBySlug,
  createAttribute,
  updateAttribute,
} = require("../controllers/attribute.controller");

// const PATH = "/attribute";

router.get(`/all`, getAllAttribute);
router.get(`/active`, getAllAttributeActive);
router.get(`/:id`, getAttributeById);
router.get(`/detail/:slug`, getAttributeBySlug);
router.post(`/`, createAttribute);
router.put(`/:id`, updateAttribute);

module.exports = router;

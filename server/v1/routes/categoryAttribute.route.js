const express = require("express");
const router = express.Router();
const {
  createCategoryAttribute,
  updateCategoryAttribute,
} = require("../controllers/categoryAttribute.controller");

// const PATH = "/category-attribute";

router.post(`/`, createCategoryAttribute);
router.put(`/:id`, updateCategoryAttribute);

module.exports = router;

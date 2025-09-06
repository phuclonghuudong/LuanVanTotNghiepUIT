const express = require("express");
const router = express.Router();
const {
  createCategorySize,
  updateCategorySize,
} = require("../controllers/categorySize.controller");

// const PATH = "/category-size";

router.post(`/`, createCategorySize);
router.put(`/:id`, updateCategorySize);

module.exports = router;

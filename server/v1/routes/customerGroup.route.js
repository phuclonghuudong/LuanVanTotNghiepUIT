const express = require("express");
const router = express.Router();
const {
  getAllCustomerGroup,
  getCustomerGroupById,
  createCustomerGroup,
  updateCustomerGroup,
} = require("../controllers/customerGroup.controller");

// const PATH = "/group";

router.get(`/`, getAllCustomerGroup);
router.get(`/:id`, getCustomerGroupById);
router.post(`/`, createCustomerGroup);
router.put(`/:id`, updateCustomerGroup);

module.exports = router;

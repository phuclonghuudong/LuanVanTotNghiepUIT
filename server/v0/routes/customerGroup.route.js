const express = require("express");
const router = express.Router();
const {
  getAllCustomerGroup,
  getCustomerGroupById,
  createCustomerGroup,
  updateCustomerGroup,
  getAllCustomerGroupActive,
} = require("../controllers/customerGroup.controller");

// const PATH = "/group";

router.get(`/all`, getAllCustomerGroup);
router.get(`/active`, getAllCustomerGroupActive);
router.get(`/:id`, getCustomerGroupById);
router.post(`/`, createCustomerGroup);
router.put(`/:id`, updateCustomerGroup);

module.exports = router;

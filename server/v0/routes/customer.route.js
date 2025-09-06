const express = require("express");
const router = express.Router();
const {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
} = require("../controllers/customer.controller");

// const PATH = "/customer";

router.get(`/`, getAllCustomer);
router.get(`/:id`, getCustomerById);
router.post(`/`, createCustomer);
router.put(`/:id`, updateCustomer);

module.exports = router;

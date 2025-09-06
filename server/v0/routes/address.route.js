const express = require("express");
const router = express.Router();
const {
  getAddressById,
  getAddressByCustomer,
  createAddress,
  updateAddress,
} = require("../controllers/address.controller");
const authenticate = require("../middlewares/authenticate");

// const PATH = "/address";

router.get(`/by-id/:id`, authenticate, getAddressById);
router.get(`/by-customer`, authenticate, getAddressByCustomer);
router.post(`/`, authenticate, createAddress);
router.put(`/:id`, authenticate, updateAddress);

module.exports = router;

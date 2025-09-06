const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllCustomer,
  getCustomerById,
  updateCustomerByStatus,
  softDeleteCustomer,
} = require("../controllers/customer.controller");

// const PATH = "/customer";

const roleManagement = ["CUSTOMER"];

router.use(authenticate, authorizeRole(...roleManagement));
router.get(`/`, getAllCustomer);
router.get(`/:id`, getCustomerById);
router.put(`/:id`, updateCustomerByStatus);
router.patch(`/delete/:id`, softDeleteCustomer);

module.exports = router;

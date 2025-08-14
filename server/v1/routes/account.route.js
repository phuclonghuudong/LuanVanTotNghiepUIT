const express = require("express");
const router = express.Router();
const {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
} = require("../controllers/account.controller");

// const PATH = "/account";

router.get(`/`, getAllAccounts);
router.get(`/:id`, getAccountById);
router.post(`/`, createAccount);
router.put(`/:id`, updateAccount);

module.exports = router;

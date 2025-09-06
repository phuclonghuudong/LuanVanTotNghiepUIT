const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  sendForgotPasswordEmail,
  verifyOtpByEmail,
  logInUser,
  registerCustomer,
  resetPassword,
  refreshToken,
  profileAccountUser,
} = require("../controllers/authUser.controller");

// const PATH = "/auth";

router.post(`/sign-in`, logInUser);
router.post(`/sign-up`, registerCustomer);

router.put(`/send-forgot-password-email`, sendForgotPasswordEmail);
router.put(`/verify-otp-by-email`, verifyOtpByEmail);
router.put(`/reset-password`, resetPassword);

router.put(`/user/refresh-token`, authenticate, refreshToken);
router.get(`/user/profile`, authenticate, profileAccountUser);

module.exports = router;

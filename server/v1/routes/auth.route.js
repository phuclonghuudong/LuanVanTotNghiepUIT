const express = require("express");
const router = express.Router();
const {
  signUpCustomer,
  verifyEmailForgotPasswordCustomer,
  signInCustomer,
  verifyOtpByEmail,
  resetPassword,
  refreshToken,
  profileAccountCustomer,
} = require("../controllers/auth.controller");
const authenticate = require("../middlewares/authenticate");

// const PATH = "/auth";

router.post(`/customer/sign-up`, signUpCustomer);
router.post(`/customer/sign-in`, signInCustomer);
router.post(
  `/customer/verify-email-forgot-password`,
  verifyEmailForgotPasswordCustomer
);
router.put(`/customer/verify-otp`, verifyOtpByEmail);
router.put(`/customer/reset-password`, resetPassword);
router.put(`/customer/refresh-token`, refreshToken);
router.get(`/customer/profile`, authenticate, profileAccountCustomer);

module.exports = router;

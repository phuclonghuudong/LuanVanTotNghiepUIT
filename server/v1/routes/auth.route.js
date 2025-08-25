const express = require("express");
const router = express.Router();
const {
  signUpCustomer,
  verifyEmailForgotPasswordCustomer,
  signIn,
  verifyOtpByEmail,
  resetPassword,
  refreshToken,
  profileAccountCustomer,
  editInfoCustomer,
} = require("../controllers/authCustomer.controller");
const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

// const PATH = "/auth";

router.post(`/sign-in`, signIn);

router.post(`/customer/sign-up`, signUpCustomer);
router.post(
  `/customer/verify-email-forgot-password`,
  verifyEmailForgotPasswordCustomer
);
router.put(`/customer/verify-otp`, verifyOtpByEmail);
router.put(`/customer/reset-password`, resetPassword);

router.put(`/customer/refresh-token`, authenticate, refreshToken);
router.get(
  `/customer/profile`,
  authenticate,
  authorizeRole("CUSTOMER"),
  profileAccountCustomer
);
router.put(
  `/customer/edit-info`,
  authenticate,
  authorizeRole("CUSTOMER"),
  editInfoCustomer
);

module.exports = router;

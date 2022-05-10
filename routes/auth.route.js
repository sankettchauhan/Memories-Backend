const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
const {
  fetchCurrentUser,
  loginWithPhoneOtp,
  createNewUser,
  verifyOTP,
} = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const {
  validateUserSignup,
  validateUserLogin,
  validateOTP,
} = require("../models/user.model");

router.post("/register", validate(validateUserSignup), createNewUser);

router.post("/login", validate(validateUserLogin), loginWithPhoneOtp);

router.post("/verify", validate(validateOTP), verifyOTP);

router.get("/me", checkAuth, fetchCurrentUser);

module.exports = router;

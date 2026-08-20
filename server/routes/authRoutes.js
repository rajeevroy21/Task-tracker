const express = require("express");

const {
  signup,
  login
} = require("../controllers/authController");

const validateSignup = require("../middleware/validateSignup");
const validateLogin = require("../middleware/validateLogin");

const router = express.Router();

router.post(
  "/signup",
  validateSignup,
  signup
);

router.post(
  "/login",
  validateLogin,
  login
);

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  loginUser,
  create,
  currentUser,
} = require("../controllers/AuthController");

// @route   GET api/auth
// @desc    Login
// @access  Public
router.post("/login", loginUser);

// @route   GET api/auth/logged-in
// @desc    Get Logged In User
// @access  Public
router.get("/current-user", auth, currentUser);

// @route   POST api/auth
// @desc    Register
// @access  Public
router.post("/register", create);

module.exports = router;

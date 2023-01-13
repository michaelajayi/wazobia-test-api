const express = require("express");
const router = express.Router();

const { loginUser, create } = require("../controllers/AuthController");

// @route   GET api/auth
// @desc    Login route
// @access  Public
router.get("/", loginUser);

// @route   POST api/auth
// @desc    Register route
// @access  Public
router.post("/", create);

module.exports = router;

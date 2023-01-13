const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/AuthController");

// @route   GET api/auth
// @desc    Login route
// @access  Public
router.get("/", (req, res) => loginUser);

module.exports = router;

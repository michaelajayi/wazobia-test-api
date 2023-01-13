const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
} = require("../controllers/ItemsController");

// @route   GET api/items
// @desc    Get all items
// @access  Private
router.get("/", findAll);

// @route   GET api/items/id
// @desc    Get one item
// @access  Private
router.get("/:id", findOne);

// @route   POST api/auth
// @desc    Add item
// @access  Private
router.post("/", addOne);

// @route   POST api/auth/id
// @desc    Update item
// @access  Private
router.patch("/:id", updateOne);

// @route   POST api/auth/id
// @desc    Delete item
// @access  Private
router.delete("/:id", deleteOne);

module.exports = router;

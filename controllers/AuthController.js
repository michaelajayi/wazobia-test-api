const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      msg: "Login successful",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  // check if user exists
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      msg: "User with email exists",
    });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  const payload = {
    user: {
      id: user._id,
      email: user.email,
    },
  };

  // Generate jwt token
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: 360000,
    },
    (err, token) => {
      if (err) throw err;
      res.status(201).json({
        success: true,
        msg: "User created successfully",
        user,
        token,
      });
    }
  );
};

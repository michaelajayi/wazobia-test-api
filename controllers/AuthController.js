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

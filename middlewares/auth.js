const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from headers
  const token = req.header("auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
  } catch (err) {
    res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};

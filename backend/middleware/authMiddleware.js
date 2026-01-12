const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      
      res.status(401);
      next(new Error("Not authorized, token failed"));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error("Not authorized, no token"));
  }
};

module.exports = { protect };

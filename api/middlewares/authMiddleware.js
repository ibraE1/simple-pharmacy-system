import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json("Please login to access this resource");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let currentUser = await User.findById(decoded.id); //block
  if (!currentUser) {
    currentUser = await Admin.findById(decoded.id);
    if (!currentUser) {
      return res
        .status(400)
        .json(
          "Your account no longer exists, please login using a different account"
        );
    }
  }
  req.user = currentUser;

  next();
};

const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role)) {
      return res
        .status(400)
        .json("You do not have permission to access this resource");
    }
    next();
  };
};

export { verifyToken, restrictTo };

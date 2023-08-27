import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/errorFactory.js";

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AppError(401, "Please login to access this resource"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    currentUser = await Admin.findById(decoded.id);
    if (!currentUser) {
      next(
        new AppError(
          403,
          "Your account no longer exists, please login using a different account"
        )
      );
    }
  }
  req.user = currentUser;

  next();
});

const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role)) {
      next(
        new AppError(403, "You do not have permission to access this resource")
      );
    }
    next();
  };
};

const restrictFields = (roles, fields) => {
  return (req, res, next) => {
    for (let key of Object.keys(req.body)) {
      if (fields.includes(key) && !roles.includes(req.user.role)) {
        next(new AppError(403, "You do not have permission to modify " + key));
      }
    }
    next();
  };
};

export { verifyToken, restrictTo, restrictFields };

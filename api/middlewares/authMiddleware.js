import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json("Please login to access this resource");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res
      .status(400)
      .json(
        "Your account no longer exists, please login using a different account"
      );
  }

  req.user = currentUser;

  next();
};

export { verifyToken };

import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/errorFactory.js";
import Email from "../utils/email.js";

const signup = expressAsyncHandler(async (req, res, next) => {
  try {
    await User.findOne({ email: req.body.email });
  } catch (error) {
    return next(new AppError(400, "This email is already registered"));
  }

  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    national_id: req.body.national_id,
    avatar_image: req.body.avatar_image,
    addresses: req.body.addresses,
  });

  newUser.password = undefined;

  const url = `${req.protocol}://${req.get("host")}/me`;
  await new Email(newUser, url).sendWelcome();

  return res.status(201).json(newUser);
});

const userLogin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(400, "Please enter email and password"));
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError(400, "Incorrect email or password"));
  }

  user.last_login = new Date(Date.now());
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.status(200).json({ token, data: { user } });
});

const adminLogin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(400, "Please enter email and password"));
  }

  let user = await Admin.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError(400, "Incorrect email or password"));
  }
  if (user.blocked == true) {
    return next(new AppError(403, "This account has been blocked"));
  }
  user.last_login = new Date(Date.now());
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.status(200).json({ token, data: { user } });
});

export { signup, userLogin, adminLogin };

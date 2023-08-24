import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    try {
      if (await User.findOne({ email: req.body.email })) {
        return res.status(400).json("This email is already registered");
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
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please enter email and password");
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(400).json("Incorrect email or password");
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
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please enter email and password");
    }

    let user = await Admin.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(400).json("Incorrect email or password");
    }
    if (user.blocked == true) {
      return res.status(400).json("This account has been blocked");
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
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { signup, userLogin, adminLogin };

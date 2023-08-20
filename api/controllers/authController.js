import User from "../models/userModel.js";

const signup = async (req, res, next) => {
  try {
    try {
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
    return res.status(500).json(error.message);
  }
};

const login = async (req, res, next) => {};

export { signup, login };

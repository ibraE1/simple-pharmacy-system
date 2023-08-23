import User from "../models/userModel.js";
import { getOne, getAll, updateOne, deleteOne } from "./factory.js";

// const createUser = async (req, res) => {}; USING SIGNUP

// const getUser = getOne(User);

const getUser = async (req, res) => {
  const document = await User.findById(req.params.id).populate("orders");
  if (!document) {
    return res.status(400).json("No document found with that ID");
  }

  res.status(200).json(document);
};

const getAllUsers = getAll(User);

const updateUser = updateOne(User);

const deleteUser = deleteOne(User);

export { getUser, getAllUsers, updateUser, deleteUser };

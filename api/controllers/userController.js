import User from "../models/userModel.js";
import { getOne, getAll, updateOne, deleteOne } from "./factory.js";

// const createUser = async (req, res) => {}; USING SIGNUP

const getUser = getOne(User, "orders");

const getAllUsers = getAll(User);

const updateUser = updateOne(User);

const deleteUser = deleteOne(User);

export { getUser, getAllUsers, updateUser, deleteUser };

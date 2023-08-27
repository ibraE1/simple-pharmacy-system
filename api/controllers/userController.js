import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { getOne, getAll, updateOne, deleteOne } from "../utils/factory.js";
import Email from "../utils/email.js";

// const createUser = async (req, res) => {}; USING SIGNUP

const getUser = getOne(User, "orders");

const getAllUsers = getAll(User);

const updateUser = updateOne(User);

const deleteUser = deleteOne(User);

const notifyUsers = expressAsyncHandler(async () => {
  const query = User.find();
  const documents = await query;
  for (let user of documents) {
    const oneDay = 24 * 60 * 60 * 1000;
    const lastLoginDate = user.last_login;
    const todaysDate = new Date();
    const diffDays = Math.round(
      Math.abs((lastLoginDate - todaysDate) / oneDay)
    );
    if (diffDays >= 30) {
      await new Email(user, "").sendNotification();
    }
  }
});

export { getUser, getAllUsers, updateUser, deleteUser, notifyUsers };

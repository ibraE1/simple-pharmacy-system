import Admin from "../models/adminModel.js";
import {
  getOne,
  getAll,
  updateOne,
  deleteOne,
  createOne,
} from "../utils/factory.js";

const createAdmin = createOne(Admin);

const getAdmin = getOne(Admin);

const getAllAdmins = getAll(Admin);

const updateAdmin = updateOne(Admin);

const deleteAdmin = deleteOne(Admin);

export { createAdmin, getAdmin, getAllAdmins, updateAdmin, deleteAdmin };

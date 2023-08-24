import Medicine from "../models/medicineModel.js";
import {
  getOne,
  getAll,
  updateOne,
  deleteOne,
  createOne,
} from "../utils/factory.js";

const createMedicine = createOne(Medicine);

const getMedicine = getOne(Medicine);

const getAllMedicines = getAll(Medicine);

const updateMedicine = updateOne(Medicine);

const deleteMedicine = deleteOne(Medicine);

export {
  createMedicine,
  getMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
};

import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  getMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.use(verifyToken);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", getMedicine);

router.get("/", getAllMedicines);

router.use(restrictTo(["admin"]));

router.route("/:id").patch(updateMedicine).delete(deleteMedicine);

export default router;

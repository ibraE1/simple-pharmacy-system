import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  getMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";
import { validateId } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", validateId(), getMedicine);

router.get("/", getAllMedicines);

router.use(restrictTo(["admin"]));

router
  .route("/:id")
  .all(validateId())
  .patch(updateMedicine)
  .delete(deleteMedicine);

export default router;

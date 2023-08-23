import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  getMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine,
  createMedicine,
} from "../controllers/medicineController.js";
import {
  validateId,
  validateBody,
  medicineSchema,
  medicineUpdateSchema,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.use(restrictTo(["doctor", "admin"]));

router.get("/", getAllMedicines);

router.get("/:id", validateId(), getMedicine);

router.use(restrictTo(["admin"]));

router.post("/", validateBody(medicineSchema), createMedicine);

router
  .route("/:id")
  .all(validateId())
  .patch(validateBody(medicineUpdateSchema), updateMedicine)
  .delete(deleteMedicine);

export default router;

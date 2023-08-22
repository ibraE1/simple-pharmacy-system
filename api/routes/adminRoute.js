import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";
import { adminLogin } from "../controllers/authController.js";
import { validateId } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.use(verifyToken);

router.use(restrictTo(["admin"]));

router.get("/:id", validateId(), getAdmin);

router.route("/").get(getAllAdmins).post(createAdmin);

router.route("/:id").all(validateId()).patch(updateAdmin).delete(deleteAdmin);

export default router;

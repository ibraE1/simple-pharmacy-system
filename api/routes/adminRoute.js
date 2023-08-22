import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(verifyToken);

router.use(restrictTo(["admin"]));

router.get("/:id", getAdmin);

router.route("/").get(getAllAdmins).post(createAdmin);

router.route("/:id").patch(updateAdmin).delete(deleteAdmin);

export default router;

import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { signup, userLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", userLogin);

router.use(verifyToken);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", getUser);

router.get("/", getAllUsers);

router.use(restrictTo(["admin"]));

router.route("/:id").patch(updateUser).delete(deleteUser);

export default router;

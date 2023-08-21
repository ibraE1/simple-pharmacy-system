import express from "express";
import { login, signup } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.use(verifyToken);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.get("/", getAllUsers);

export default router;

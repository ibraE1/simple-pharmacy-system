import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { signup, userLogin } from "../controllers/authController.js";
import {
  userSchema,
  validateBody,
  validateId,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/signup", validateBody(userSchema), signup);

router.post("/login", userLogin);

router.use(verifyToken);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", validateId(), getUser);

router.get("/", getAllUsers);

router.use(restrictTo(["admin"]));

router.route("/:id").all(validateId()).patch(updateUser).delete(deleteUser);

export default router;

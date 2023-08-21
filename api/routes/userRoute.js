import express from "express";
import { login, signup } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.use(verifyToken);

export default router;

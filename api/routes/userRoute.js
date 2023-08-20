import express from "express";
import { login, signup, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.use(verifyToken);

export default router;

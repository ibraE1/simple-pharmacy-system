import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);

router.use(restrictTo(["doctor"]));

router.patch("/:id", updateOrder);

router.use(restrictTo(["admin"]));

router.get("/:id", getOrder);

router.get("/", getAllOrders);

router.delete("/:id", deleteOrder);

export default router;

import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { validateId } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);

router.use(restrictTo(["doctor"]));

router.patch("/:id", validateId(), updateOrder);

router.use(restrictTo(["admin"]));

router.get("/:id", validateId(), getOrder);

router.get("/", getAllOrders);

router.delete("/:id", validateId(), deleteOrder);

export default router;

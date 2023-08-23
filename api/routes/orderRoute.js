import express from "express";
import { restrictTo, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import {
  validateId,
  validateBody,
  orderSchema,
  orderUpdateSchema,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", validateBody(orderSchema), createOrder);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", validateId(), getOrder);

router.patch(
  "/:id",
  validateId(),
  validateBody(orderUpdateSchema),
  updateOrder
);

router.use(restrictTo(["admin"]));

router.get("/", getAllOrders);

router.delete("/:id", validateId(), deleteOrder);

export default router;

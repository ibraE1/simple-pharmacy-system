import express from "express";
import {
  restrictFields,
  restrictTo,
  verifyToken,
} from "../middlewares/authMiddleware.js";
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
import {
  saveOrderPhoto,
  uploadOrderPhoto,
} from "../middlewares/imageMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post(
  "/",
  restrictFields(["doctor", "admin"], ["status", "items"]),
  uploadOrderPhoto,
  saveOrderPhoto,
  validateBody(orderSchema),
  createOrder
);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", validateId(), getOrder);

router.patch(
  "/:id",
  validateId(),
  restrictFields(["admin"], ["address"]),
  restrictFields([], ["id", "image"]),
  uploadOrderPhoto,
  saveOrderPhoto,
  validateBody(orderUpdateSchema),
  updateOrder
);

router.use(restrictTo(["admin"]));

router.get("/", getAllOrders);

router.delete("/:id", validateId(), deleteOrder);

export default router;

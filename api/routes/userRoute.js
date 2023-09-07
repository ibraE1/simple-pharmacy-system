import express from "express";
import {
  restrictTo,
  verifyToken,
  restrictFields,
} from "../middlewares/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { signup, userLogin } from "../controllers/authController.js";
import {
  userSchema,
  userUpdateSchema,
  validateBody,
  validateId,
} from "../middlewares/validationMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";
import {
  uploadUserPhoto,
  resizeUserPhoto,
} from "../middlewares/imageMiddleware.js";
import { getOne } from "../utils/factory.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { applyOptions } from "../utils/queryOptions.js";
import orderModel from "../models/orderModel.js";

const router = express.Router();

router.post("/signup", validateBody(userSchema), signup);

router.post("/login", userLogin);

router.use(verifyToken);

router
  .route("/me")
  .all((req, res, next) => {
    req.params.id = req.user.id;
    next();
  })
  .get(getOne(User))
  .patch(
    restrictFields([], ["id"]),
    uploadUserPhoto,
    resizeUserPhoto,
    validateBody(userUpdateSchema),
    updateUser
  );

router.get(
  "/me/orders",
  validateId(),
  (req, res, next) => {
    req.query.user_id = req.user.id;
    next();
  },
  expressAsyncHandler(async (req, res) => {
    const query = applyOptions(orderModel.find(), req);
    const documents = await query.populate("items.medicine_id");
    res.status(200).json({ results: documents.length, data: documents });
  })
);

router.use(restrictTo(["doctor", "admin"]));

router.get("/:id", validateId(), getUser);

router.get(
  "/:id/orders",
  validateId(),
  (req, res, next) => {
    req.query.user_id = req.params.id;
    next();
  },
  getAllOrders
);

router.get("/", getAllUsers);

router.use(restrictTo(["admin"]));

router
  .route("/:id")
  .all(validateId())
  .patch(
    restrictFields([], ["id"]),
    uploadUserPhoto,
    resizeUserPhoto,
    validateBody(userUpdateSchema),
    updateUser
  )
  .delete(deleteUser);

export default router;

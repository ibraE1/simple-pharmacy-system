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

const router = express.Router();

router.post("/signup", validateBody(userSchema), signup);

router.post("/login", userLogin);

router.use(verifyToken);

router.get(
  "/me",
  (req, res, next) => {
    req.params.id = req.user.id;
    next();
  },
  getUser
);

router.get(
  "/me/orders",
  validateId(),
  (req, res, next) => {
    req.query.user_id = req.user.id;
    next();
  },
  getAllOrders
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
    restrictFields(
      ["admin"],
      ["name", "email", "national_id", "addresses", "avatar_image"]
    ),
    restrictFields([], ["user_id"]),
    validateBody(userUpdateSchema),
    updateUser
  )
  .delete(deleteUser);

export default router;

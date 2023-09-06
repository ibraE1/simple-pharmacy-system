import express from "express";
import {
  restrictFields,
  restrictTo,
  verifyToken,
} from "../middlewares/authMiddleware.js";
import {
  createAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";
import { adminLogin } from "../controllers/authController.js";
import {
  validateId,
  validateBody,
  adminSchema,
  adminUpdateSchema,
} from "../middlewares/validationMiddleware.js";
import {
  resizeUserPhoto,
  uploadUserPhoto,
} from "../middlewares/imageMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.use(verifyToken);

router.use(restrictTo(["admin"]));

router
  .route("/me")
  .all((req, res, next) => {
    req.params.id = req.user.id;
    next();
  })
  .get(getAdmin)
  .patch(
    restrictFields([], ["id"]),
    uploadUserPhoto,
    resizeUserPhoto,
    validateBody(adminUpdateSchema),
    updateAdmin
  );

router.get("/:id", validateId(), getAdmin);

router
  .route("/")
  .get(getAllAdmins)
  .post(validateBody(adminSchema), createAdmin);

router
  .route("/:id")
  .all(validateId())
  .patch(
    restrictFields([], ["id"]),
    uploadUserPhoto,
    resizeUserPhoto,
    validateBody(adminUpdateSchema),
    updateAdmin
  )
  .delete(deleteAdmin);

export default router;

import expressAsyncHandler from "express-async-handler";
import multer from "multer";
import sharp from "sharp";
import AppError from "../utils/errorFactory.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (["jpeg", "png"].includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(next(new AppError(400, "Please upload a png or jpg image")), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single("avatar_image");

const resizeUserPhoto = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const role = req.user.role;
  req.body.avatar_image = `images/${role}s/${role}-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.avatar_image}`);

  next();
});

const uploadOrderPhoto = upload.single("image");

const saveOrderPhoto = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `images/orders/order-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.image}`);

  next();
});

export { uploadUserPhoto, resizeUserPhoto, uploadOrderPhoto, saveOrderPhoto };

import multer from "multer";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (["jpeg", "png"].includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(res.status(400).json("Please upload a png or jpg image"), false);
  }
  console.log("filter");
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single("avatar_image");

const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  const role = req.user.role;
  req.body.avatar_image = `images/${role}s/${role}-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.avatar_image}`);

  next();
};

export { uploadUserPhoto, resizeUserPhoto };

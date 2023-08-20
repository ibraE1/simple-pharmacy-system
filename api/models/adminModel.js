import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  national_id: {
    required: true,
    type: String,
    unique: true,
  },
  avatar_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "doctor"],
  },
});

export default Admin = mongoose.model("Admin", adminSchema);

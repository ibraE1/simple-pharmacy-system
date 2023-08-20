import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    unique: true,
  },
  avatar_image: {
    type: String,
    default: "default.jpg",
  },
  addresses: {
    type: [String],
    required: true,
  },
  last_login: {
    type: Date,
  },
});

export default User = mongoose.model("User", userSchema);

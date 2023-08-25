import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    default: "images/default.jpg",
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

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = async function (
  enteredPassword,
  hashedPassword
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export default mongoose.model("Admin", adminSchema);

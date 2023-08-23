import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address."],
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Please enter a password that is 6 characters or longer"],
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
    notes: {
      type: String,
    },
    last_login: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  enteredPassword,
  hashedPassword
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

userSchema.virtual("orders", {
  ref: "Order",
  foreignField: "user_id",
  localField: "_id",
});

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default Medicine = mongoose.model("Medicine", medicineSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  items: [
    {
      medicine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total_price: {
    type: Number,
  },
  status: {
    type: String,
    enum: [
      "Processing",
      "WaitingForUserConfirmation",
      "Canceled",
      "Confirmed",
      "Delivered",
    ],
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);

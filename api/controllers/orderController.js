import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import {
  getOne,
  getAll,
  updateOne,
  deleteOne,
  createOne,
} from "../utils/factory.js";
import Email from "../utils/email.js";
import AppError from "../utils/errorFactory.js";

const createOrder = createOne(Order);

const getOrder = getOne(Order, ["items.medicine_id", "user_id"], { price: 0 });

const getAllOrders = getAll(Order);

// const updateOrder = updateOne(Order);

const updateOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate([
    "items.medicine_id",
    "user_id",
  ]);

  if (!order) {
    next(new AppError(400, "No document found with that ID"));
  }

  const status = order.status;
  if (["Confirmed", "Canceled", "Delivered"].includes(status)) {
    next(new AppError(400, `${status} orders cannot be updated`));
  }

  if (status == "Processing" && !req.user.role && req.body.status) {
    next(
      new AppError(403, "You do not have permission to update order status")
    );
  }

  for (const [key, value] of Object.entries(req.body)) {
    order[key] = value;
  }

  order.save();
  const newStatus = order.status;
  if (newStatus == "WaitingForUserConfirmation" && status == "Processing") {
    sendOrderConfirmation(order);
  }

  res.status(200).json(order);
});

const deleteOrder = deleteOne(Order);

const sendOrderConfirmation = expressAsyncHandler(async (order) => {
  const url = "/order/" + order.id + "/confirm";

  await new Email(
    order.user_id,
    process.env.CLIENT_URL + url
  ).sendConfirmation();
});

export { createOrder, getOrder, getAllOrders, updateOrder, deleteOrder };

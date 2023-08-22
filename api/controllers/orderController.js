import Order from "../models/orderModel.js";
import { getOne, getAll, updateOne, deleteOne, createOne } from "./factory.js";

const createOrder = createOne(Order);

const getOrder = getOne(Order);

const getAllOrders = getAll(Order);

const updateOrder = updateOne(Order);

const deleteOrder = deleteOne(Order);

export { createOrder, getOrder, getAllOrders, updateOrder, deleteOrder };

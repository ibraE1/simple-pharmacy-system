import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import orderRouter from "./routes/orderRoute.js";
import medicineRouter from "./routes/medicineRoute.js";

const app = express();

config();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/medicine", medicineRouter);

const port = 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "simple-pharmacy-system",
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

export default app;

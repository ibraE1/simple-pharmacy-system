import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import orderRouter from "./routes/orderRoute.js";
import medicineRouter from "./routes/medicineRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import AppError from "./utils/errorFactory.js";
import { notifyUsers } from "./controllers/userController.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/medicine", medicineRouter);

app.all("*", (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server`));
});

app.use(errorHandler);

cron.schedule("0 1 * * *", () => {
  notifyUsers();
  console.log("scheduled emails sent");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "simple-pharmacy-system",
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

export default app;

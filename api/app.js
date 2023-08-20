import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();

config();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

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

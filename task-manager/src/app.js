import express from "express";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/tasks.js";
import auth from "./middleware/auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(auth);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

export default app

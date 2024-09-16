import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const mongodb = mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

export default mongodb;

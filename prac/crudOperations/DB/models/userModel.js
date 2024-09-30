const mongoose = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) =>
          value.length >= 8 && value.toLowerCase() !== "password",
        message: (props) =>
          props.value.toLowerCase() === "password"
            ? "Password cannot be 'password'!"
            : "Password should be at least 8 characters long",
      },
    },
    tokens: [
      {
        token: {
          type: String,
        //   required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User",User)
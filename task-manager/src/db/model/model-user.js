import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Task from "./model-task.js";
import dotenv from "dotenv";
dotenv.config();

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "Age cannot be negative",
      },
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
          required: true,
        },
      },
    ],
    avatar: {
        type:Buffer
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for tasks
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// Hide sensitive information
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

// Generate JWT Token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT, {
    expiresIn: "1h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Find user by email and password
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Unable to login: User not found.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login: Incorrect password.");
  }
  return user;
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete all tasks when the user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
  const user = this;
  try {
    await Task.deleteMany({ owner: user._id });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;

const express = require("express");
const route = express.Router();
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userControllers.js");
const auth = require("../middlewares/auth.js");

// Create User
route.post("/api", createUser);

// login User
route.post("/login", loginUser);

// Read User
route.get("/api", auth, readUser);

// update user
route.patch("/api", auth, updateUser);

// delete user
route.delete("/api", auth, deleteUser);

module.exports = route;

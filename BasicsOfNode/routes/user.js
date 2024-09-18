const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const userRoutes = express.Router();
const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const env = require('dotenv')
const auth = require('../middlewares/auth.js')
env.configDotenv()

userRoutes.use(cors());
userRoutes.use(cookieParser());

// signup page
userRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

// signup form submission
userRoutes.post("/signup", async (req, res) => {
  const {
    name,
    email,
    phone,
    city,
    state,
    pincode,
    country,
    password,
    confirmPassword,
  } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user instance
    const newUser = new User({
      name,
      email,
      phone,
      city,
      state,
      pincode,
      country,
      password: hash,
    });

    // Save the user to the database
    await newUser.save();
    console.log("User Saved :)");
    res.status(200).send("Signup success. now you can login.");
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Signup failed. Please try again.");
  }
});

userRoutes.get("/login", (req, res) => {
  res.render("login");
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Create a token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Store the token in a cookie
      res.cookie("token", token);
      const isLoggedIn = !!req.cookies.token;
      res.render("product", { products: [], isLoggedIn })
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Login failed. Please try again.");
  }
});

userRoutes.get("/logout", (req, res) => {
    res.clearCookie('token'); 
    res.render("login"); 
});

module.exports = userRoutes;

const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const userRoutes = express.Router();
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
const auth = require("../middlewares/auth.js");
const nodemailer = require("nodemailer");

env.configDotenv();

userRoutes.use(cors());
userRoutes.use(cookieParser());

// signup page
userRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

// // signup form submission
// userRoutes.post("/signup", async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     city,
//     state,
//     pincode,
//     country,
//     password,
//     confirmPassword,
//   } = req.body;

//   // Check if passwords match
//   if (password !== confirmPassword) {
//     return res.status(400).send("Passwords do not match.");
//   }

//   try {
//     // Generate salt and hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Create new user instance
//     const newUser = new User({
//       name,
//       email,
//       phone,
//       city,
//       state,
//       pincode,
//       country,
//       password: hash,
//     });

//     // Save the user to the database
//     await newUser.save();
//     console.log("User Saved :)");
//     res.status(200).send("Signup success. now you can login.");
//   } catch (err) {
//     console.error("Error during signup:", err);
//     res.status(500).send("Signup failed. Please try again.");
//   }
// });

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 for TLS
  secure: false,
  auth: {
    user: "alokwastesting@gmail.com", // Make sure this is correct
    pass: "xgsr wwii ecmc rbev", // Use an app password if 2FA is enabled
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: true,
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  closeTimeout: 5000,
});

// Signup form submission
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

    // Generate OTP
    const otp = generateOTP();

    // Create or update user in the database
    const newUser = await User.findOneAndUpdate(
      { email }, // Search for user by email
      {
        name,
        phone,
        city,
        state,
        pincode,
        country,
        password: hash,
        otp, // Assign OTP to user
        otpExpires: Date.now() + 300000, // OTP valid for 5 minutes
      },
      { new: true, upsert: true } // Create a new user if not found
    );

    // Send OTP via email
    const mailOptions = {
      from: "alokwastesting@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email");

    // Render OTP verification page
    res.render("verify-otp", { email });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Signup failed. Please try again.");
  }
});


// OTP verification
userRoutes.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found.");
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).send("Invalid or expired OTP.");
    }

    // Clear the OTP fields if desired
    user.otp = null;
    user.otpExpires = null;

    await user.save(); // Save the changes
    console.log("OTP verified and user saved:", user);

    res.status(200).send("Signup success. Now you can log in.");
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).send("Verification failed. Please try again.");
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
      res.render("product", { products: [], isLoggedIn });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Login failed. Please try again.");
  }
});

userRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("login");
});

module.exports = userRoutes;

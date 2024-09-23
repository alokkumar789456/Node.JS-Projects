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

// Signup page
userRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 for TLS
  secure: false,
  auth: {
    user: "alokwastesting@gmail.com",
    pass: "xgsr wwii ecmc rbev",
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


    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = generateOTP();

    // Create or update user in the database
    const newUser = await User.findOneAndUpdate(
      { email },
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
      { new: true, upsert: true }
    );

    console.log("New User:", newUser); // Log user details

    if (!newUser) {
      return res.render("signup", { error: "User creation or update failed." });
    }

    // Send OTP via email
    const mailOptions = {
      from: "alokwastesting@gmail.com",
      to: email,
      subject: "Your OTP for Secure Access to Hmmmmm! by BrainPhantom",
      text: `
    Hi ${name},
    
    Thank you for choosing Hmmmmm! by BrainPhantom.
    
    To proceed with your request, please use the One-Time Password (OTP) below to complete your verification:
    
    Your OTP: ${otp}
    
    Please note that this OTP is valid for the next 10 minutes and can only be used once.
    
    If you didn’t request this, please ignore this email or contact our support team.
    
    Thank you for your trust in us.
    
    Best regards,
    The Hmmmmm! Team
    BrainPhantom`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email");

    // Render OTP verification page
    res.render("verify-otp", { email });
  
});

// OTP verification
userRoutes.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.render("verify-otp", { email, error: "User not found." });
    }
  
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.render("verify-otp", { email, error: "Invalid or expired OTP." });
    }
    // Clear the OTP fields if desired
    // Clear the OTP fields
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.render("login", { success: "Signup success. Now you can log in." });
 
});

// Login page
userRoutes.get("/login", (req, res) => {
  const isLoggedIn = !!req.cookies.token;
  res.render("login", { products: [], isLoggedIn });
});

// Login form submission
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;


    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    // Compare provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Create a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Store the token in a cookie
      res.cookie("token", token, { httpOnly: true }); // Added httpOnly for security

      // Pass the email and isLoggedIn to the EJS template
      const isLoggedIn = !!req.cookies.token;
      res.render("product", { products: [], isLoggedIn, email: user.email, profileImage:user.profileImage });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  
});


// Logout
userRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("login", { success: "You have logged out." });
});



module.exports = userRoutes;

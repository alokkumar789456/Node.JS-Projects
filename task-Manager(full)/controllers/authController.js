const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Send OTP via email
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    text: `Welcome to Book Store Application! \n\nYour OTP code for the Book Store SignUp Verification is: ${otp}\n\nIf this wasn’t you, kindly report to alokwastesting@gmail.com.`,
  };

  await transporter.sendMail(mailOptions);
};

// Signup logic
exports.signup = async (req, res) => {
  const { name, email, phone, password, admin } = req.body;

  // Validate input
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Create a new user
    user = new User({ name, email, phone, password, admin });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.token = otp;

    // Save user and send OTP
    await user.save();
    await sendOTP(email, otp);

    res.status(201).json({ msg: "Signup successful, OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    return res.status(400).json({ msg: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    // Check if the OTP matches
    if (user.token !== otp) return res.status(400).json({ msg: "Invalid OTP" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.token = token;

    // Generate admin token if the user is an admin
    let adminToken = null;
    if (user.admin) {
      adminToken = jwt.sign({ id: user._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    await user.save();

    res.status(200).json({ token, adminToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    // console.log(password); // DBug
    // console.log(isMatch); // DBug 
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and return JWT
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Generate admin token if the user is an admin
    let adminToken = null;
    if (user.admin) {
      adminToken = jwt.sign({ id: user._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    res.json({ token, adminToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

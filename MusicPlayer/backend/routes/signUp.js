const express = require('express');
const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const signUpRoute = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Generate OTP and send it to the user's email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP for email verification is: ${otp}`,
  };
  await transporter.sendMail(mailOptions);
};

signUpRoute.post('/', async (req, res) => {
  const { username, name, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Create new user
    const newUser = new User({
      username,
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    await newUser.save();
    await sendOtpEmail(email, otp);

    // Create a JWT token
    const token = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: '1h' });

    // Set JWT as a cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).send({ message: 'User registered successfully! Check your email for OTP verification.' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Error registering user', error });
  }
});

signUpRoute.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (user.otp !== otp) {
      return res.status(400).send({ message: 'Invalid OTP' });
    }
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    // Generate a new token for verified user
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    // Set the new JWT as a cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).send({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Error verifying OTP', error });
  }
});

// Middleware to parse cookies
signUpRoute.use(cookieParser());

module.exports = signUpRoute;

const express = require('express');
const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const loginRoute = express.Router();

// Login page route (optional)
loginRoute.get('/login', (req, res) => {
  res.send("Login Page");
});

// Login logic
loginRoute.post('/', async (req, res) => {
  const { email, password } = req.body; 
  console.log(email);
  console.log(password);

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token (optional)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    res.json({ 
      message: "Login successful", 
      token,
      user: { 
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = loginRoute;

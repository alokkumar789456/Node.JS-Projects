//! This Middleware is used in Restaurant model to verify 
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.auth = async (req) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Error("Access denied. No token provided.");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user using the ID from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("Invalid token");
    }

    return user; 
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error("Token expired. Please log in again.");
    } else {
      throw new Error("Invalid token.");
    }
  }
};

// Function to refresh the access token
exports.refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided.");
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    // Check if the user exists based on the decoded userId
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token.");
    }

    // Generate a new access token
    const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", 
    });

    return newAccessToken; 
  } catch (err) {
    console.error(err);
    throw new Error("Failed to refresh access token.");
  }
};

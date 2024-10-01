const jwt = require('jsonwebtoken');
// const User = require('../models/User.js')
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Get token from the headers
  const token = req.header('Authorization');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // console.log(token); //DBug
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Add user payload to req object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

const Employee = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// jwt variable
const JWT_SECRET = process.env.JWT_SECRET;

exports.changePassword = async (req, res) => {
    const token = req.cookies.authToken;
  
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const email = decoded.email;
      const { newPassword } = req.body;
  
      const empDetails = await Employee.findOne({ where: { email } });
      
      if (!empDetails) {
        return res.status(404).json({ error: "Employee not found." });
      }
  
      empDetails.password = newPassword;
      await empDetails.save();
  
      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.userDetails = async (req, res) => {
    const token = req.cookies.authToken;
  
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;
  
      const empDetails = await Employee.findOne({ where: { email } });
  
      if (!empDetails) {
        return res.status(404).json({ error: "Employee not found." });
      }
  
      const { password, ...employeeDetails } = empDetails.dataValues;
  
      res.status(200).json(employeeDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
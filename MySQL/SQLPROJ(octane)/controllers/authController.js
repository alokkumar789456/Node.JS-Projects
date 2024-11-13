const Employee = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRandomPassword } = require("../helpers/validations.js");
require("dotenv").config();

// jwt variable
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.admin) {
      return res
        .status(403)
        .json({ error: "Access denied. Admin privileges required." });
    }

    const { empId, email, role, dept, branch, admin } = req.body;
    const emailExists = await Employee.findOne({ where: { email } });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email already exists. Try another one!" });
    }

    const randomPassword = generateRandomPassword();

    const empTable = await Employee.create({
      empId,
      email,
      password: randomPassword,
      role,
      dept,
      branch,
      admin,
      createdBy: decoded.empId,
    });

    res.status(201).json({
      empId: empTable.empId,
      email: empTable.email,
      role: empTable.role,
      generatedPassword: randomPassword,
      createdBy: decoded.empId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(404).send("You don't have an account with this email!");
    }

    const comparePass = bcrypt.compareSync(password, employee.password);
    if (!comparePass) {
      return res.status(401).send("Incorrect password. Please try again.");
    }

    const token = jwt.sign(
      {
        empId: employee.empId,
        email: employee.email,
        admin: employee.admin,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      maxAge: 3600000,
    });

    res
      .status(200)
      .send(`Login successful! Welcome, Employee ID: ${employee.empId}`);
  } catch (error) {
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

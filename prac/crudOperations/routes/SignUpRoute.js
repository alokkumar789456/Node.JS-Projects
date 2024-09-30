const express = require("express");
const SignUp = express.Router();

SignUp.post("/", (req, res) => {
  const { name, email, phone, password, confirmPass } = req.body;
  
  
});

module.exports = SignUp;

const Employee = require("../models/userModel.js");

exports.checkEmail = async (req,res,email) => {
    const existingEmployee = await Employee.findOne({ where: { email } });
    
    if (existingEmployee) {
      res.status(400).send("Email already exists. Try a new one!");
      return true; 
    }
};

exports.generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); 
};

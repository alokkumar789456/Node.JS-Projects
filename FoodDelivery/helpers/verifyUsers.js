const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.isUser = (user,res) => {
  // Check if user exists
  if (!user) {
    return res.status(404).send("User not found");
  }
};

exports.isAdmin = (userAdmin) => {
  if (userAdmin === false)
    return res.status(400).send("Only admins are allowed!");
};

exports.matchBcryptPassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compare(password, userPassword);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }
};

exports.generateToken = (email, userId) => {
  return (token = jwt.sign({ email, userId }, process.env.JWT_SECRET));
};

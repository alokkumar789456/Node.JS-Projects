const User = require("../models/userModel.js");
const validator = require("validator");
const {
  isUser,
  isAdmin,
  matchBcryptPassword,
  generateToken,
} = require("../helpers/verifyUsers.js");

exports.createUser = async (req, res) => {
  const { name, phone, email, password, confirmPassword, address, admin } =
    req.body;

  // Check if all fields are provided
  if (
    !name ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword ||
    !address ||
    admin === undefined
  ) {
    return res
      .status(400)
      .send(
        "All fields (name, phone, email, password, confirmPassword, address, admin) are required"
      );
  }

  // Validate phone number
  if (phone.length !== 10) {
    return res
      .status(400)
      .send("Phone Number should contain exactly 10 digits");
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).send("Email is not valid");
  }

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Validate password length and complexity
  if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
    return res
      .status(400)
      .send(
        "Password should contain at least 8 characters and include one special symbol"
      );
  }

  // Confirm that password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).send("Password and Confirm Password do not match!");
  }

  // If all checks pass, create the new user
  const createUser = new User({
    name,
    phone,
    email,
    password,
    confirmPassword,
    address,
    admin,
  });
  await createUser.save();

  res.status(200).send("User saved successfully :)");
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    isUser(user);
    const userPassword = user.password;
    matchBcryptPassword(password, userPassword);
    generateToken(email, user.id);
    user.token = generateToken.token;
    await user.save();
    res.cookie("token", token);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.readUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    isUser(user);
    isAdmin(user.admin);
    const listUsers = await User.find();
    res.status(200).json({ "List of users": listUsers });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid token");
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(400).send("Error updating user: " + err.message);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    isUser(user);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

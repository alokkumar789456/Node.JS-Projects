const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  // Cart to store food items and their quantities
  cart: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',  // Reference to Food model
        required: true,
      },
      qty: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
  // Order history with food items and total price for each
  order: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      }
    }
  ],
  // Array of restaurant references for users who own multiple restaurants
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',  // Reference to Restaurant model
    }
  ]
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Model definition
const User = mongoose.model('User', userSchema);
module.exports = User;

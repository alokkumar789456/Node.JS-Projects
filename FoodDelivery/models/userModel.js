const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// User Schema 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
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
  cart: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodModel', // Reference to the Food schema
      },
      qty: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
  order: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodModel',
      },
      totalPrice: {
        type: Number,
        required: true,
      }
    }
  ]
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

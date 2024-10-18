const mongoose = require("mongoose");

exports.connectDB = mongoose.connect(
  "mongodb://localhost:27017/FoodDeliveryApp"
);
try {
  console.log("DB Successfully Connected!");
} catch (err) {
  console.error(err.message);
}

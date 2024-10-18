const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth.js");
const { addToCart, placeOrder } = require("../controllers/ordersAndCart.js");

route.post("/addToCart", auth, addToCart);
route.post("/placeOrder", auth, placeOrder);

module.exports = route;
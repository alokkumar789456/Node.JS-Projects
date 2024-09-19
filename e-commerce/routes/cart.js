const User = require("../models/userModel.js");
const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth.js");
const Product = require("../models/productModel.js");
const jwt = require("jsonwebtoken");
const findUserById = require("../public/javascript/fetchOrders.js")

router.use(auth);

// Route to fetch all orders
router.get("/my/list", async (req, res) => {
    try {
        const obj = req.cookies;
        const token = Object.values(obj)[0];
        const decoded = jwt.decode(token);
        const userId = decoded.id;
        
        // console.log('User ID:', userId);
        
        // Fetch user orders and product details
        const products = await findUserById(userId);

        // Check if products were found
        if (products) {
            res.render('orders', { products });
        } else {
            res.render('orders', { products: [] }); 
        }
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Render the cart page
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = response.data;

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("cart", { product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Confirm order route
router.post("/confirm", async (req, res) => {
  const { productId, paymentMethod } = req.body;
  console.log(productId);
  console.log(paymentMethod);
  const obj = req.cookies;
  const token = Object.values(obj)[0];
  const decoded = jwt.decode(token);
  const userId = decoded.id;
    console.log(userId);
  try {
    // Add the order to the user's order history
    await User.findByIdAndUpdate(userId, { $push: { orders: productId } });

    res.send("Order confirmed");
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

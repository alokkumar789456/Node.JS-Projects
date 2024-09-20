// const User = require("../models/userModel.js");
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const mongoose = require("mongoose");
// const auth = require("../middlewares/auth.js");
// const Product = require("../models/productModel.js");
// const jwt = require("jsonwebtoken");
// const findUserById = require("../public/javascript/fetchOrders.js")

// router.use(auth);

// // Route to fetch all orders
// router.get("/my/list", async (req, res) => {
//     try {
//         const obj = req.cookies;
//         const token = Object.values(obj)[0];
//         const decoded = jwt.decode(token);
//         const userId = decoded.id;
        
//         // console.log('User ID:', userId);
        
//         // Fetch user orders and product details
//         const products = await findUserById(userId);

//         // Check if products were found
//         if (products) {
//             res.render('orders', { products });
//         } else {
//             res.render('orders', { products: [] }); 
//         }
//     } catch (error) {
//         console.error('Error fetching user orders:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// // Render the cart page
// router.get("/:productId", async (req, res) => {
//   const productId = req.params.productId;

//   try {
//     const response = await axios.get(
//       `https://fakestoreapi.com/products/${productId}`
//     );
//     const product = response.data;

//     if (!product) {
//       return res.status(404).send("Product not found");
//     }

//     res.render("cart", { product });
//   } catch (err) {
//     console.error("Error fetching product:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Confirm order route
// router.post("/confirm", async (req, res) => {
//   const { productId, paymentMethod } = req.body;
//   console.log(productId);
//   console.log(paymentMethod);
//   const obj = req.cookies;
//   const token = Object.values(obj)[0];
//   const decoded = jwt.decode(token);
//   const userId = decoded.id;
//     console.log(userId);
//   try {
//     // Add the order to the user's order history
//     await User.findByIdAndUpdate(userId, { $push: { orders: productId } });

//     res.send("Order confirmed");
//   } catch (err) {
//     console.error("Error confirming order:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = router;
const User = require("../models/userModel.js");
const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const Order = require("../models/orderModel.js");
const Cart = require("../models/cartModel.js"); // Ensure Cart model is imported
const jwt = require("jsonwebtoken");

router.use(auth);

// Add to Cart
router.post('/add-to-cart', async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cartItem = new Cart({ userId, productId });
        await cartItem.save();
        res.send('Product added to cart');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Remove product from cart
router.post('/remove-from-cart', async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        await Cart.findOneAndDelete({ userId, productId });
        res.send('Product removed from cart');
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Fetch user's cart products
router.get('/my/cart', async (req, res) => {
    const userId = req.user.id;

    try {
        const cartItems = await Cart.find({ userId }).populate('productId');
        res.render('newCart', { products: cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Cancel Order
router.post("/my/orders/cancel", async (req, res) => {
  const { orderId } = req.body;

  try {
      await Order.findByIdAndDelete(orderId, { status: 'canceled' }); // Update status to 'canceled'
      res.redirect("/my/list"); // Redirect to the orders list
  } catch (error) {
      console.error("Error canceling order:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Fetch user's orders
router.get("/my/list", async (req, res) => {
    try {
        const obj = req.cookies;
        const token = Object.values(obj)[0];
        const decoded = jwt.decode(token);
        const userId = decoded.id;

        const orders = await Order.find({ userId });

        const ordersWithProductInfo = await Promise.all(
            orders.map(async (order) => {
                try {
                    const response = await axios.get(`https://fakestoreapi.com/products/${order.productId}`);
                    return { ...order.toObject(), product: response.data };
                } catch (error) {
                    console.error(`Error fetching product details for ID ${order.productId}:`, error);
                    return null;
                }
            })
        );

        const validOrders = ordersWithProductInfo.filter(order => order !== null);

        res.render('orders', { orders: validOrders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Edit Payment Method
router.post("/my/orders/edit-payment", async (req, res) => {
    const { orderId, paymentMethod } = req.body;

    try {
        await Order.findByIdAndUpdate(orderId, { paymentMethod });
        res.redirect("/my/list");
    } catch (error) {
        console.error("Error updating payment method:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Edit Shipping Address
router.post("/my/orders/edit-address", async (req, res) => {
    const { orderId, name, email, phone, city, state, pincode, country } = req.body;

    try {
        await Order.findByIdAndUpdate(orderId, {
            shippingAddress: { name, email, phone, city, state, pincode, country }
        });
        res.redirect("/my/list");
    } catch (error) {
        console.error("Error updating shipping address:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Fetch product details
router.get("/:productId", async (req, res) => {
    const productId = req.params.productId;

    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        const product = response.data;

        const obj = req.cookies;
        const token = Object.values(obj)[0];
        const decoded = jwt.decode(token);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        const currentAddress = `${user.city}, ${user.state}, ${user.pincode}, ${user.country}`;
        
        res.render("cart", { product, currentAddress, user });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Confirm order route
router.post("/confirm", async (req, res) => {
    const { productId, paymentMethod, name, email, phone, city, state, pincode, country, useCurrentAddress } = req.body;

    const obj = req.cookies;
    const token = Object.values(obj)[0];
    const decoded = jwt.decode(token);
    const userId = decoded.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        const shippingAddress = useCurrentAddress ? {
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.city,
            state: user.state,
            pincode: user.pincode,
            country: user.country,
        } : { name, email, phone, city, state, pincode, country };

        const newOrder = new Order({
            userId,
            productId,
            paymentMethod,
            shippingAddress,
        });

        await newOrder.save();
        user.orders.push(newOrder._id);
        await user.save();

        res.send("Order confirmed");
        console.log("Received Data:", req.body);
    } catch (err) {
        console.error("Error confirming order:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

const User = require("../models/userModel.js");
const express = require("express");
const axios = require("axios");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const Order = require("../models/orderModel.js");
const Cart = require("../models/cartModel.js");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

router.use(auth);

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profile_images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

// Helper function to get user ID from JWT token
const getUserIdFromToken = (req) => {
  const { token } = req.cookies;
  const { id } = jwt.decode(token);
  return id;
};

// POST: Update Profile with image upload
router.post("/my/profile", upload.single("profileImage"), async (req, res) => {
  const token = req.cookies.token;
  const { name, email, phone, city, state, pincode, country, address } =
    req.body;
  let profileImage = req.file ? req.file.path : null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.city = city;
    user.state = state;
    user.pincode = pincode;
    user.country = country;
    user.address = address;

    if (profileImage) {
      user.profileImage = profileImage;
    }

    await user.save();
    res.redirect("/my/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.render("editprofile", { error: "Internal Server Error", user });
  }
});

// GET: View Profile
router.get("/my/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("editprofile", { user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.render("editprofile", { error: "Internal Server Error" });
  }
});

// Add to Cart
router.post("/add-to-cart", async (req, res) => {
  try {
    const { productId } = req.body;
    const token = req.cookies.token;
    const decoded = jwt.decode(token);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = response.data;

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const cartItem = new Cart({ userId, productId });
    await cartItem.save();
    res.redirect("/my/cart");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.render("newCart", { error: "Internal Server Error" });
  }
});

// Remove product from cart
router.post("/remove-from-cart", async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    await Cart.findOneAndDelete({ userId, productId });
    res.redirect("/my/cart");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.render("newCart", { error: "Internal Server Error" });
  }
});

// Fetch user's cart products
router.get("/my/cart", async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await Cart.find({ userId });
    const productsWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${item.productId}`
          );
          return { ...item._doc, productDetails: response.data };
        } catch (error) {
          console.error(
            `Error fetching details for product ID ${item.productId}:`,
            error
          );
          return { ...item._doc, productDetails: null };
        }
      })
    );

    res.render("newCart", { products: productsWithDetails });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.render("newCart", { error: "Internal Server Error" });
  }
});

// Cancel Order
router.post("/my/orders/cancel", async (req, res) => {
  const { orderId } = req.body;

  try {
    await Order.findByIdAndDelete(orderId, { status: "canceled" });
    res.redirect("/my/list");
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
          const response = await axios.get(
            `https://fakestoreapi.com/products/${order.productId}`
          );
          return { ...order.toObject(), product: response.data };
        } catch (error) {
          console.error(
            `Error fetching product details for ID ${order.productId}:`,
            error
          );
          return null;
        }
      })
    );

    const validOrders = ordersWithProductInfo.filter((order) => order !== null);

    res.render("orders", { orders: validOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).send("Internal Server Error");
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
  const { orderId, name, email, phone, city, state, pincode, country } =
    req.body;

  try {
    await Order.findByIdAndUpdate(orderId, {
      shippingAddress: { name, email, phone, city, state, pincode, country },
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
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = response.data;

    const obj = req.cookies;
    const token = Object.values(obj)[0];
    const decoded = jwt.decode(token);
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const currentAddress = user
      ? {
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          state: user.state,
          pincode: user.pincode,
          country: user.country,
        }
      : {};

    res.render("cart", { product, currentAddress, user });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Internal Server Error");
  }
});
                                                    
// Confirm order route
router.post("/confirm", async (req, res) => {
  const {
    productId,
    paymentMethod,
    name,
    email,
    phone,
    city,
    state,
    pincode,
    country,
    useCurrentAddress,
  } = req.body;

  const obj = req.cookies;
  const token = Object.values(obj)[0];
  const decoded = jwt.decode(token);
  const userId = decoded.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const shippingAddress = useCurrentAddress
      ? {
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          state: user.state,
          pincode: user.pincode,
          country: user.country,
        }
      : { name, email, phone, city, state, pincode, country };

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

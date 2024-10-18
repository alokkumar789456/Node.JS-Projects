const User = require('../models/userModel.js')

exports.addToCart = async (req, res) => {
    try {
      const { foodId, qty } = req.body;
      const userId = req.userId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Check if the food is already in the cart
      const foodExists = user.cart.find(item => item.foodId.toString() === foodId);
  
      if (foodExists) {
        // Update the quantity if the food is already in the cart
        foodExists.qty += qty;
      } else {
        // Add new food to the cart
        user.cart.push({ foodId, qty });
      }
  
      await user.save();
      res.status(200).json({ message: "Food added to cart", cart: user.cart });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding to cart");
    }
  };
  
  exports.placeOrder = async (req, res) => {
    try {
      const userId = req.userId; 
  
      // Find the user by ID
      const user = await User.findById(userId).populate('cart.foodId'); 
  
      if (user.cart.length === 0) {
        return res.status(400).send("Cart is empty");
      }
  
      // Calculate total price for each item and clear the cart
      user.cart.forEach(item => {
        const totalPrice = item.foodId.price * item.qty;
        user.order.push({
          foodId: item.foodId._id,
          totalPrice
        });
      });
  
      // Clear the cart after placing the order
      user.cart = [];
      await user.save();
  
      res.status(200).json({ message: "Order placed successfully", order: user.order });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error placing order");
    }
  };
  
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const { auth } = require("../helpers/authMiddleware.js");
const mongoose = require("mongoose");

exports.createRestaurant = async (req, res) => {
  const { name, dishes } = req.body;

  try {
    // Validate input
    if (!name || !dishes || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).json({ error: "Name and dishes are required" });
    }

    // Format dishes
    const formattedDishes = dishes.map((d) => ({
      dish: new mongoose.Types.ObjectId(d.dish),
      stock: d.stock,
    }));

    // Create restaurant
    const restaurant = new Restaurant({ name, dishes: formattedDishes });
    await restaurant.save();

    res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
  } catch (err) {
    console.error(err);
    // Handle different types of errors
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: err.message });
    }
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: "Duplicate key error", details: err.keyValue });
    }
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.readRestaurants = async (req, res) => {
  try {
    const user = await auth(req);

    // Check if the user has any restaurants associated
    if (!user.restaurants || user.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found for this user." });
    }

    // Populate the user's restaurants with restaurant data
    const userWithRestaurants = await User.findById(user.id).populate(
      "restaurants"
    ); 

    if (!userWithRestaurants || !userWithRestaurants.restaurants.length) {
      return res.status(404).json({ message: "No restaurants found." });
    }

    res.status(200).json(userWithRestaurants.restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, dishes } = req.body;

  try {
    const user = await auth(req);
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (!user.restaurants.includes(restaurantId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Update the restaurant details
    restaurant.name = name || restaurant.name;

    if (dishes && Array.isArray(dishes)) {
      restaurant.dishes = dishes.map((d) => ({
        dish: new mongoose.Types.ObjectId(d.dish),
        stock: d.stock,
      }));
    }

    await restaurant.save();
    res
      .status(200)
      .json({ message: "Restaurant updated successfully", restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const user = await auth(req);

    if (!user.restaurants.includes(restaurantId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Remove restaurant from user's restaurants list
    user.restaurants = user.restaurants.filter(
      (id) => id.toString() !== restaurantId
    );
    await user.save();

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

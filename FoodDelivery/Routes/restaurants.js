const express = require("express");
const route = express.Router();
const { createRestaurant, readRestaurants, updateRestaurant, deleteRestaurant } = require("../controllers/restaurantController");

// Create new restaurant (for logged-in user)
route.post("/api", createRestaurant);

// Get all restaurants of the logged-in user
route.get("/api", readRestaurants);

// Update a restaurant (by the owner)
route.put("/api/:restaurantId", updateRestaurant);

// Delete a restaurant (by the owner)
route.delete("/api/:restaurantId", deleteRestaurant);

module.exports = route;

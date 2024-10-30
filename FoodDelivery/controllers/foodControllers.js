const Food = require("../models/foodModel.js");
const { isAdmin } = require("../helpers/verifyUsers.js");
const User = require("../models/foodModel.js")

// Create Food (Admin Only)
exports.createFood = async (req, res) => {
  const { code, name, description, price } = req.body; 
  const user = User.findById(req.cookies.token)
  if (user.admin === false)
    return res.status(400).send("Only admins are allowed!");

  // Validate input
  if (!code || !name || !description || !price) {
    return res.status(400).send("Only code, name, description, and price are allowed");
  }

  try {
    // Create new food item
    const food = new Food({ code, name, description, price });
    await food.save();
    res.status(201).json({ message: "Food item created successfully", food });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating food item");
  }
};

// Read All Food Items (Public)
exports.readFood = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json({ message: "List of food items", foodItems });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching food items");
  }
};

// Function to add multiple food items
exports.createMultipleFoods = async (req, res) => {
    const foodItems = req.body; // Expecting an array of food items
  
    if (!Array.isArray(foodItems) || foodItems.length === 0) {
      return res.status(400).send("You must provide an array of food items.");
    }
  
    try {
      // Insert multiple food items into the database
      const createdFoods = await Food.insertMany(foodItems);
  
      res.status(201).json({
        message: "Multiple food items added successfully",
        createdFoods
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while adding food items.");
    }
  };

// Update Food (Admin Only)
exports.updateFood = async (req, res) => {
  const { id } = req.params;
  const { code, name, description, price } = req.body;

  const user = User.findById(req.cookies.token)
  if (user.admin === false)
    return res.status(400).send("Only admins are allowed!");

  try {
    // Find and update the food item
    const updatedFood = await Food.findByIdAndUpdate(id, { code, name, description, price }, { new: true, runValidators: true });

    if (!updatedFood) {
      return res.status(404).send("Food item not found");
    }

    res.status(200).json({ message: "Food item updated successfully", food: updatedFood });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating food item");
  }
};

// Delete Food (Admin Only)
exports.deleteFood = async (req, res) => {
  const { id } = req.params;

  const user = User.findById(req.cookies.token)
  if (user.admin === false)
    return res.status(400).send("Only admins are allowed!");

  try {
    // Find and delete the food item
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).send("Food item not found");
    }

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting food item");
  }
};

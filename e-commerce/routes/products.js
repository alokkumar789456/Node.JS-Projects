const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const productRoutes = express.Router();
const User = require('../models/userModel.js')
productRoutes.use(cors());

// Middleware to verify token and get user email
const getUserFromToken = (req) => {
    const token = req.cookies.token; // Ensure token is accessed after defining it
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.email; // Return the email instead of username
        } catch (error) {
            console.error('Token decoding error:', error);
        }
    }
    return null;
};

// Product page
productRoutes.get('/', async (req, res) => {
    const email = getUserFromToken(req); 
    const isLoggedIn = !!email; // Check if user is logged in
    let profileImage = '';

    if (isLoggedIn) {
        // Fetch the user's profile image from the database
        const user = await User.findOne({ email });
        if (user) {
            profileImage = user.profileImage; 
        }
    }

    res.render('product', { products: [], isLoggedIn, email, profileImage });
});

module.exports = productRoutes;

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); 
const productRoutes = express.Router();
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
productRoutes.get('/', (req, res) => {
    const email = getUserFromToken(req); 
    console.log(email)// Get email from token
    const isLoggedIn = !!email; // Check if user is logged in
    res.render('product', { products: [], isLoggedIn, email });
});

module.exports = productRoutes;

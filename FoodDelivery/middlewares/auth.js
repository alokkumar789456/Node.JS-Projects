const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js'); // Adjust the path to your User model

const auth = async (req, res, next) => {
    const token = req.cookies.token;

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user id and email to the request object
        req.userId = decoded.userId;
        req.email = decoded.email;
         
        // for user details 
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = auth;

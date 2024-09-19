const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid token.");
        }
        req.user = decoded; 
        next(); 
    });
};

module.exports = auth;

const express = require('express');
const cors = require('cors');
const productRoutes = express.Router();
productRoutes.use(cors());

// product page
productRoutes.get('/', (req, res) => {
    const isLoggedIn = !!req.cookies.token;
    res.render('product', { products: [], isLoggedIn });
});


module.exports = productRoutes;

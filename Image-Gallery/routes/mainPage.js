const express = require('express');
const mainRoute = express.Router();

mainRoute.get('/', (req, res) => {
    const loggedIn = req.isAuthenticated(); 
    const user = req.user || {};
    res.render('mainPage', { loggedIn, user });
});


module.exports = mainRoute;

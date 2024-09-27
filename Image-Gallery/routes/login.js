const express = require('express');
const loginRoute = express.Router();

loginRoute.get('/', (req, res) => {
    res.render('loginPage');
});

loginRoute.get('/logout', (req, res, next) => {
    console.log('Logging out user...');
    res.clearCookie('connect.sid', { path: '/' }); 
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return next(err);
        }
        console.log('Session destroyed, redirecting...');
        res.redirect('/');
    });
});

module.exports = loginRoute;

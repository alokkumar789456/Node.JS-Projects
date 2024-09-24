const express = require('express');

const signUpRoute = express.Router();

signUpRoute.get('/signUp', (req, res) => { 
    res.send('<a href="/api/auth/google">google</a>'); 
});

signUpRoute.get('/protected',()=>{
    res.send('Hello!')
})

module.exports = signUpRoute;

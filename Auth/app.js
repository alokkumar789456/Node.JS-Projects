const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
//! COOKIE PACKAGE TO READ COOKIES  
app.use(cookieParser())

app.get('/',(req,res)=>{
    //! example to send Cookies
    res.cookie("cooookie","antant83rn")
    res.send("Cookie storing example")
})

app.get('/read',(req,res)=>{
    console.log(req.cookies);
    res.send('This is a read page where cookies are sticked by default')
})

app.get('/bcrypt',(req,res)=>{
    //! check out the website to see other techniques as well
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("Password", salt, function(err, hash) {
    //         console.log(hash);
    //     });
    // });
    //! to check the encrypted password we have to compare 
    //! the original password and hash which is created by that password 
    bcrypt.compare("Password", "$2b$10$uHCh1CeZECCx5YmlSBtrdOZEikfU.9Izo3wF2vN/bVtuPVdYZOsL2", function(err, result) {
        // console.log('if Password and hash matches then password is correct');
        if (result==true) {
        console.log("Result is",result ,"password is correct");
        } else {
        console.log("Result is",result ,"password is WRONG");
        }
    });
    res.send("check out terminal to see hash password")
})

app.get('/jwt',(req,res)=>{
    const token = jwt.sign({email:"loki@gmail.com"},"secret_key")
    console.log(token);
    res.send("check the terminal for token example")
    //token has 3 parts that string header , data , signature 
})

//! whatever the cookie we send or get is actually encrypted using jwt (one of the use case)
app.get('/jwtcookie',(req,res)=>{
    const token = jwt.sign({email:"loki@gmail.com"},"secret_key")
    res.cookie("token",token)
    res.send("you just sent a encrypted string which is actually cookie data")
})

app.get("/cookiejwt",(req,res)=>{
    console.log(req.cookies);
    res.send('just check the terminal for examples')
    //to verify the user you need take that token and compare with your secret key 
    let data = jwt.verify(req.cookies.token,"secret_key")
    // also you can fetch data here unlike bcrypt just log and see data 
    console.log(data);
})

app.listen(3000,(err)=>{
    if (err) {
        console.error(err.message)
    } else {
        console.log("Server Connected");
    }
})


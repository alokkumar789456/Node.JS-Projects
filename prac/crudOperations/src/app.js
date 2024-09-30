const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

require('dotenv').config()
require('../DB/mongoose.js')

// Routes Import
const SignUp = require('../routes/SignUpRoute.js')

port = process.env.PORT || 3000

// app.set("view engine","ejs")
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

// Routes
app.use(SignUp)

//EndPoints
app.listen(port,()=>{
    console.log(`Server connected to Port ${port}`);
})
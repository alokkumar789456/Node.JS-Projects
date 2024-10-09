const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ejs = require("ejs")
const user = require('./models/user.js')
const port = process.env.port || 3000

const app = express()

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/create', (req, res) => {
    const { username, email, password, age } = req.body
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt,async (err, hash) => {
            const createdUser = await user.create({ username, email, password:hash, age })
            let token = jwt.sign({email},'shhhhhhh')
            res.cookie("token",token) 
            res.send(createdUser)
        })
    })
})

app.get('/login',(req,res)=>{
    res.render("login")
})

app.post('/login',async (req,res)=>{
    let users = await user.findOne({email:req.body.email})
    if(!users) return res.send('something went Wrong')
    //compare the password to check the password
    bcrypt.compare(req.body.password,users.password,(err,result)=>{
        if (result==true) {
            let token = jwt.sign({email:user.email},'shhhhhhh')
            res.cookie("token",token) 
            res.send("login Credentials are Correct You are Logged In")
        } else {
            res.send('something went Wrong')
        }
    })
})

app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('/');
});


app.listen(port, (err) => {
    if (err) {
        console.error(err.message())
    } else {
        console.log(`server connected to port: ${port} successfully`);
    }
})
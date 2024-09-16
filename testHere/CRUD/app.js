const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const ejs = require('ejs')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path')
const User = require('./model/UserModel.js');

dotenv.config()
const port = process.env.PORT
const token = process.env.JWT_SECRET_KEY
const mongo_url = process.env.MONGO_URL
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10

const app = express()
app.set('view engine', "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MONGODB connected Successfully');
    })
    .catch((err) => {
        console.error(err.message)
    })

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render("register")
})


app.post('/submit', async (req, res) => {
    const { name, email, phone, password, dob } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already exists. Please use a new email ID.');
            return res.status(400).send('Email already exists. Please use a new email ID.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Create and save the user
        const user = new User({ name, email, phone, password: hashedPassword, dob });
        await user.save();

        // Send success response
        res.status(201).send('User successfully created');
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).send('Oops! Something went wrong');
    }
});

app.post('/check', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).send('User not found');
        }
        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            // Passwords match, redirect to success page
            res.redirect('/success'); // Redirect to a success page
        } else {
            // Passwords do not match
            res.status(401).send('Invalid password');
        }
    } catch (error) {
        console.error('Error checking user:', error.message);
        res.status(500).send('Oops! Something went wrong');
    }
});

app.get('/success',(req,res)=>{
    res.render("successfull")
})

app.listen(port, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Server Connected Successfully');
    }
})
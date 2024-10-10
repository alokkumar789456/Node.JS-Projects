require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser'); // Added for cookies

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser()); // Added for parsing cookies

// Define routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/url', require('./routes/url.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

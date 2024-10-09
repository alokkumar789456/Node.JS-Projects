require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const cartRoute = require('./routes/cartRoute.js');
const orderRoutes = require('./routes/orderRoutes.js');

const app = express();
connectDB();
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', cartRoute); 
app.use('/api',orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

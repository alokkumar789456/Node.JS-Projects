const express = require('express');
const app = express();
const connectDB = require('./config/DB/DB.js');
const router = require('./Routes/mainRoute.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();

connectDB;
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port,()=>{
    console.log(`Server Connected to ${port}`);
})
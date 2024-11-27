const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./routes/indexRoutes.js'))

module.exports = app;

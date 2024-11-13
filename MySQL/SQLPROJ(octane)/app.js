const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require('./config/DB.js')
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', require("./routes/indexRoute.js"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Connected to ${port}`);
});

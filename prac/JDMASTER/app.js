const express = require("express");
const mongoose = require('mongoose')
const app = express();
require('ejs')
require('dotenv').config()
const port = process.env.PORT || 3000;

app.use(express.json())
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => res.send("index"));

app.listen(port, () => console.log(`app listening on port ${port}!`));

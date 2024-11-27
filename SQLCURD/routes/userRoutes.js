const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
    const cookie = "This Is Cookie"
    res.cookie('cookie',cookie)
  res.send("I am On");
});


module.exports = router;

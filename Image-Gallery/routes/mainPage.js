const express = require("express");
const router = express.Router();
const GoogleUser = require('../model/googleModel.js')
const app = require("../app"); 

router.get("/mainPage", async (req, res) => {
  const loggedIn = req.isAuthenticated();
  const user = req.user || {};
  let images = [];

  console.log("Logged in:", loggedIn);
  console.log("User:", user);
  console.log("Images being sent to the template:", images);

  // Check if the user is logged in and has images
  if (loggedIn && user.imageUrls) {
    images = user.imageUrls;
  }

  console.log("Images being sent to the template:", images); 
  res.render("mainPage", { loggedIn, user, images }); 
});

module.exports = router;

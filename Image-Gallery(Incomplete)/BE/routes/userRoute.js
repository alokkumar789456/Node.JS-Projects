const express = require("express")
const router = express.Router()
const User = require('../models/userModel.js')

router.post("/registerData",async (req,res)=>{
    const {name,email,phone,password,confirmPassword} = req.body;
    const user = new User({name,email,phone,password,confirmPassword})
    await user.save()
    console.log("User Saved :)");
})

router.get("/registerData",async (req,res)=>{
    const users = await User.find({});
    res.json(users);
})

module.exports = router;
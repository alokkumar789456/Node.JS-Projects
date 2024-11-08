const mongoose = require("mongoose");
require("dotenv").config();
const DB  = mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Server Connected to DB");
})
.catch(()=>{console.error("Unable to Connect MongoDB")})

module.exports = DB;
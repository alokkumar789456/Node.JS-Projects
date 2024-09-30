const mongoose = require('mongoose')
require('dotenv').config()

const DB = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`MongoDb Connected`);
})
.catch((err)=>{
    console.error(err.message);
})

module.exports = DB;
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/AuthProj')
    .then(()=>{
        console.log('MongoDB connected successfully');
    })
    .catch((err)=>{
        console.error("MongoDb is Not Connected",err.message);
    })

const userSchema = mongoose.Schema({
        username:String,
        email:String,
        password:String,
        age:Number
})

module.exports = mongoose.model("user",userSchema)
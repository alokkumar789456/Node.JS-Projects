const mongoose = require('mongoose')

const DB = mongoose.connect('mongodb://localhost:27017/e-commerce')
.then(()=>{
    console.log('Mongo DB connected Successfully');
})
.catch((err)=>{
    console.log('something went wrong',err.message);
})

module.exports = DB
const express = require('express')
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products')
const path = require('path');
const Db = require('./models/mongoose.js')
const app = express()
const cartRoutes = require('./routes/cart');


app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(userRoutes)
app.use(productRoutes)
app.use('/cart', cartRoutes);

const port = process.env.PORT||3000

app.listen(port,()=>{
    console.log(`connected to port ${port}`);
})


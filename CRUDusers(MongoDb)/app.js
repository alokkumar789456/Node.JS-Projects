const express = require('express');
const path = require('path');
const app = express();

// Assuming a model is correctly set up in './models/users.js'
const User = require('./models/users.js');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/read', async (req, res) => {
    try {
        let users = await User.find();
        res.render('read', { users });
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/create', async (req, res) => {
    const { name, email, image } = req.body;
    try {
        let createdUser = await User.create({ name, email, image });
        res.redirect('/read');
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/delete/:id',async (req,res)=>{
    let users = await User.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})

app.get('/edit/:id',async (req,res)=>{
    let users = await User.findOne({_id:req.params.id})
    res.render('edit',{users})
})

app.post('/update/:id',async (req,res)=>{
    const{name,email,image} = req.body
    let users = await User.findOneAndUpdate({_id:req.params.id},{name,image,email},{new:true})
    res.redirect('/read')
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

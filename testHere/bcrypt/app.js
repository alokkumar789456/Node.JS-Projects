const express = require('express');
const path = require("path");
const bcrypt = require('bcrypt')
const app = express()

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/hash-password', (req, res) => {
    const password = req.body.password;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing the password');
        }
        console.log('Hashed password:', hashedPassword); // Print to console
        res.send(`<p>Hashed Password: ${hashedPassword}</p><a href="/">Back</a>`);
    });
});


app.listen(3000,()=>{
    console.log('Server connected');
})
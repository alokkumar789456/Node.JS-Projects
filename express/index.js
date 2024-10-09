const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('username', 'loki'); 
    res.send('Cookie has been set');
});

app.get('/aa', (req, res) => {
    const username = req.cookies.username;
    console.log(username); 
    res.send(`Hello, ${username}!`); 
});

app.listen(3000, () => console.log('Server ready'));

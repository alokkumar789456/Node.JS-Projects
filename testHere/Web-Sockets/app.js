const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('chat message',(msg)=>{
        console.log('message received: ',msg);
        io.emit('chat message', msg);
    })   
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, (err) => {
    if (err) console.error(err.message);
    else console.log('Server connected on port 3000');
});

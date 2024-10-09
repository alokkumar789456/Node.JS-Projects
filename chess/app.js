const express = require('express');
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let spectators = {};

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: "Chess Game" });
});

io.on("connection", (uniquesocket) => {
    console.log('User connected');
    
    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    } else {
        spectators[uniquesocket.id] = uniquesocket;
        uniquesocket.emit("spectatorRole");
        uniquesocket.emit("boardState", chess.fen()); // Send current board state to new spectator
    }

    uniquesocket.on('disconnect', () => {
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        } else {
            delete spectators[uniquesocket.id];
        }
        
        // Notify all remaining spectators about the disconnection
        io.emit('spectatorUpdate', { disconnected: uniquesocket.id });
    });

    uniquesocket.on("move", (move) => {
        try {
            if (chess.turn() === 'w' && uniquesocket.id !== players.white) return;
            if (chess.turn() === 'b' && uniquesocket.id !== players.black) return;

            const result = chess.move(move);
            if (result) {
                io.emit('move', move);
                io.emit('boardState', chess.fen()); // Send updated board state
            } else {
                console.log('Invalid Move:', move);
                uniquesocket.emit("invalidMove", move);
            }
        } catch (error) {
            console.error(error);
            console.log("Invalid move:", move);
        }
    });
});


const isPromotionMove = (move) => {
    const piece = chess.get(move.from);
    return piece && piece.type === 'p' && (move.to[1] === '1' || move.to[1] === '8');
};

io.on("connection", (uniquesocket) => {
    console.log('User connected');
    
    // Assign roles and handle new connections...

    uniquesocket.on("move", (move) => {
        try {
            if (chess.turn() === 'w' && uniquesocket.id !== players.white) return;
            if (chess.turn() === 'b' && uniquesocket.id !== players.black) return;

            if (isPromotionMove(move)) {
                const result = chess.move(move);
                if (result) {
                    io.emit('move', move);
                    io.emit('boardState', chess.fen());
                } else {
                    console.log('Invalid Move:', move);
                    uniquesocket.emit("invalidMove", move);
                }
            } else {
                // Handle non-promotion moves
                const result = chess.move(move);
                if (result) {
                    io.emit('move', move);
                    io.emit('boardState', chess.fen());
                } else {
                    console.log('Invalid Move:', move);
                    uniquesocket.emit("invalidMove", move);
                }
            }
        } catch (error) {
            console.error(error);
            console.log("Invalid move:", move);
        }
    });
});


server.listen(port, (err) => {
    if (err) console.error(err.message);
    else console.log(`Server running on port ${port}`);
});

const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessBoard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♟", // Black pawn
        r: "♜", // Black rook
        n: "♞", // Black knight
        b: "♝", // Black bishop
        q: "♛", // Black queen
        k: "♚", // Black king
        P: "♙", // White pawn
        R: "♖", // White rook
        N: "♘", // White knight
        B: "♗", // White bishop
        Q: "♕", // White queen
        K: "♔"  // White king
    };
    return unicodePieces[piece.type] || '';
};

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add('square', (rowIndex + colIndex) % 2 === 0 ? "light" : "dark");

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = colIndex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece', square.color === 'w' ? 'white' : "black");
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: colIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => e.preventDefault());

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece && playerRole) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = (source, target) => {
    const moveFrom = `${String.fromCharCode(97 + source.col)}${8 - source.row}`;
    const moveTo = `${String.fromCharCode(97 + target.col)}${8 - target.row}`;

    const piece = chess.get(`${moveFrom}`);
    const isPromotion = (piece && piece.type === 'p' && (target.row === 0 || target.row === 7));

    const move = {
        from: moveFrom,
        to: moveTo
    };

    if (isPromotion) {
        move.promotion = 'q'; // You can customize promotion type here
    }

    const result = chess.move(move);
    if (result) {
        socket.emit('move', move);
        renderBoard();
    } else {
        console.log('Invalid move:', move);
    }
};

// Handle the role assignment
socket.on('playerRole', (role) => {
    playerRole = role;
    renderBoard();
});

// Handle the spectator role
socket.on('spectatorRole', () => {
    playerRole = null;
    renderBoard();
});

// Update board state when move is received
socket.on('boardState', (fen) => {
    chess.load(fen);
    renderBoard();
});

// Handle move updates from the server
socket.on('move', (move) => {
    chess.move(move);
    renderBoard();
});

// Optional: Handle spectator updates
socket.on('spectatorUpdate', ({ disconnected }) => {
    console.log(`Spectator with ID ${disconnected} has left.`);
});

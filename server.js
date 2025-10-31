// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

let players = [];
let currentTurn = null;
let board = Array.from({ length: 6 }, () => Array(7).fill(null)); // 6x7 grid

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  if (players.length < 2) {
    socket.emit("waiting", "Waiting for another player to join...");

    socket.on("setName", (name) => {
      players.push({ id: socket.id, name, color: players.length === 0 ? "red" : "yellow" });

      if (players.length === 2) {
        currentTurn = players[0].id;
        io.emit("startGame", { players, currentTurn });
      }
    });
  } else {
    socket.emit("full", "Room full. Try again later.");
  }

  socket.on("makeMove", (col) => {
    if (socket.id !== currentTurn) return;

    for (let row = 5; row >= 0; row--) {
      if (!board[row][col]) {
        const player = players.find(p => p.id === socket.id);
        board[row][col] = player.color;

        io.emit("updateBoard", { board, col, row, color: player.color });

        if (checkWin(row, col, player.color)) {
          io.emit("gameOver", `${player.name} wins!`);
          resetGame();
          return;
        }

        // Change turn
        currentTurn = players.find(p => p.id !== socket.id).id;
        io.emit("turnChange", currentTurn);
        break;
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    players = players.filter(p => p.id !== socket.id);
    board = Array.from({ length: 6 }, () => Array(7).fill(null));
    io.emit("playerLeft", "A player left. Game reset.");
  });
});

function resetGame() {
  board = Array.from({ length: 6 }, () => Array(7).fill(null));
  currentTurn = null;
  players = [];
}

function checkWin(row, col, color) {
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (const [dr, dc] of directions) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
      const r = row + dr * i, c = col + dc * i;
      if (r < 0 || r >= 6 || c < 0 || c >= 7 || board[r][c] !== color) break;
      count++;
    }
    for (let i = 1; i < 4; i++) {
      const r = row - dr * i, c = col - dc * i;
      if (r < 0 || r >= 6 || c < 0 || c >= 7 || board[r][c] !== color) break;
      count++;
    }
    if (count >= 4) return true;
  }
  return false;
}

server.listen(PORT, () => console.log(`Connect 4 server running on http://localhost:${PORT}`));


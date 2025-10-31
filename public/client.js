const socket = io();
const boardDiv = document.getElementById("board");
const statusDiv = document.getElementById("status");
const joinBtn = document.getElementById("joinBtn");
const nameInput = document.getElementById("playerName");

let playerId = null;
let myColor = null;
let myName = "";
let currentTurn = null;

joinBtn.onclick = () => {
  myName = nameInput.value.trim() || "Player";
  socket.emit("setName", myName);
  document.getElementById("setup").style.display = "none";
  statusDiv.textContent = "Waiting for opponent...";
};

socket.on("waiting", (msg) => (statusDiv.textContent = msg));

socket.on("full", (msg) => (statusDiv.textContent = msg));

socket.on("startGame", (data) => {
  playerId = socket.id;
  const me = data.players.find(p => p.id === socket.id);
  myColor = me.color;
  currentTurn = data.currentTurn;

  statusDiv.textContent = `Game started! You are ${myColor.toUpperCase()}.`;

  createBoard();
  updateTurnStatus();
});

socket.on("updateBoard", ({ board }) => renderBoard(board));

socket.on("turnChange", (id) => {
  currentTurn = id;
  updateTurnStatus();
});

socket.on("gameOver", (msg) => {
  alert(msg);
  statusDiv.textContent = msg;
});

socket.on("playerLeft", (msg) => {
  alert(msg);
  window.location.reload();
});

function createBoard() {
  boardDiv.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.col = j;
      cell.onclick = () => {
        if (socket.id === currentTurn) {
          socket.emit("makeMove", j);
        }
      };
      boardDiv.appendChild(cell);
    }
  }
}

function renderBoard(board) {
  const cells = document.querySelectorAll(".cell");
  let k = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      cells[k].className = "cell";
      if (board[i][j]) cells[k].classList.add(board[i][j]);
      k++;
    }
  }
}

function updateTurnStatus() {
  if (socket.id === currentTurn) {
    statusDiv.textContent = "Your turn!";
  } else {
    statusDiv.textContent = "Opponent's turn!";
  }
}


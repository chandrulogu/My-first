# 🎮 Real-Time Connect 4 Multiplayer Game

A real-time **two-player Connect 4 game** built using **Node.js**, **Express**, **Socket.IO**, and a simple **HTML + CSS + JavaScript** frontend.

Players can join from two different browsers, set their names, and take turns dropping pieces into the grid — all updated live using WebSockets.

---

## 🧠 Project Overview

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js with Express and Socket.IO  
- **Realtime Communication:** WebSockets (via Socket.IO)  
- **Game Logic:** Connect 4 board (6 × 7 grid) with win detection  
- **Players:** Two users can join and play against each other in real time  

---

## 🚀 Features

✅ Real-time two-player gameplay  
✅ Automatic turn switching  
✅ Live board updates  
✅ Win detection (horizontal, vertical, diagonal)  
✅ Player name setup  
✅ Handles disconnects and restarts gracefully  

---

## 🏗️ Folder Structure

```

connect4-game/
│
├── server.js              # Node.js backend
├── package.json
│
└── public/
├── index.html         # Game UI
├── style.css          # Styling
└── client.js          # Frontend logic

````

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/chandrulogu/My-first.git
cd My-first
````

### 2️⃣ Install dependencies

Make sure Node.js is installed, then run:

```bash
npm install
```

### 3️⃣ Run the server

```bash
node server.js
```

### 4️⃣ Open the game

Open your browser and go to:

```
http://localhost:3000
```

🕹️ Open this link in **two tabs** or **two different browsers** to play with another player.

---

## 🧩 How to Play

1. Each player enters their name and clicks **Join Game**.
2. Player 1 (Red) starts first.
3. Click on a column to drop your piece.
4. The first player to connect four in a row wins!
5. If a player disconnects, the game resets.

---

## 🧠 Technologies Used

* **Node.js** – Server runtime
* **Express.js** – Backend framework
* **Socket.IO** – Real-time communication
* **HTML5 Canvas / Grid** – Frontend display
* **CSS3** – Styling and layout

---

## 🧪 Testing & Validation

✅ Tested locally with two players
✅ Verified real-time updates through Socket.IO events
✅ Works across Chrome, Edge, and Firefox

---

## 🏁 Future Improvements

* Add a **chat system** between players
* Maintain a **scoreboard / match history**
* Add **sound effects** and animations
* Deploy to a live hosting service (Render, Vercel, etc.)




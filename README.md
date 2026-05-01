<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tech Quiz Battle</title>
<link rel="stylesheet" href="style.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>

<div class="stars"></div>

<!-- WELCOME SCREEN -->
<div id="welcomeScreen" class="screen active">
  <h1>⚡ Tech Quiz Battle</h1>
  <input type="text" id="playerName" placeholder="Enter your name">

  <select id="difficulty">
    <option>Easy</option>
    <option>Medium</option>
    <option>Hard</option>
  </select>

  <select id="category">
    <option>All</option>
    <option>AI/ML</option>
    <option>Web Dev</option>
    <option>Data Science</option>
    <option>Cybersecurity</option>
    <option>General CS</option>
  </select>

  <button id="startBtn">🚀 Start Battle</button>

  <h3>🏆 High Score: <span id="highScore">0</span></h3>
</div>

<!-- QUIZ SCREEN -->
<div id="quizScreen" class="screen">
  <div class="top-bar">
    <span id="qNumber"></span>
    <span id="score">Score: 0</span>
  </div>

  <div id="timerBar"></div>

  <h2 id="question"></h2>
  <div id="options"></div>

  <div class="lifelines">
    <button id="fifty">50-50</button>
    <button id="skip">Skip</button>
    <button id="hint">Hint</button>
  </div>
</div>

<!-- RESULT SCREEN -->
<div id="resultScreen" class="screen">
  <h1>🏁 Results</h1>
  <p id="finalScore"></p>
  <p id="grade"></p>
  <p id="performance"></p>
  <button id="shareBtn">📋 Share Score</button>
  <button onclick="location.reload()">🔄 Restart</button>
</div>

<!-- LEADERBOARD -->
<div id="leaderboard">
  <h2>🏆 Leaderboard</h2>
  <ul id="leaderList"></ul>
</div>

<script src="script.js"></script>
</body>
</html>

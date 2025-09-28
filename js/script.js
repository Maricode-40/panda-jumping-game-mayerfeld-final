
// --- DOM elements ---
const game = document.getElementById("game");
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const goal = document.getElementById("goal");
const scoreOutput = document.getElementById("score");
const gameOverText = document.getElementById("game-over");
const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-button");

// --- Config ---
let JUMP_HEIGHT;
const JUMP_SPEED = 5.5;
let OBSTACLE_WIDTH;
let gameSpeed;
const TOTAL_LAPS = 2;

// --- Sounds ---
const jumpSound = new Audio("./assets/sounds/jumping-sound.wav");
jumpSound.volume = 0.4;
const gameOverSound = new Audio("./assets/sounds/drowning.mp3");
const winSound = new Audio("./assets/sounds/game-win-other.mp3");

// --- State ---
let isJumping = false;
let score = 0;
let gameRunning = false;
let playerX = 20;
let lapCount = 0;

// --- Helpers ---
function getGameWidth() {
  return game.clientWidth;
}

function getGameHeight() {
  return game.clientHeight;
}

function setGameConfig() {
  JUMP_HEIGHT = getGameHeight() * 0.3;
  OBSTACLE_WIDTH = getGameWidth() * 0.07;
  gameSpeed = getGameWidth() * 0.01;
}

// --- Jump ---
function jump() {
  if (isJumping || !gameRunning) return;
  isJumping = true;

  jumpSound.pause();
  jumpSound.currentTime = 0;
  jumpSound.play().catch(console.error);

  let bottom = 0;
  let goingUp = true;

  function animateJump() {
    if (!goingUp && bottom <= 0) {
      isJumping = false;
      return;
    }
    if (goingUp && bottom >= JUMP_HEIGHT) goingUp = false;

    bottom += goingUp ? JUMP_SPEED : -JUMP_SPEED;
    player.style.bottom = `${bottom}px`;
    player.style.left = `${playerX}px`;

    requestAnimationFrame(animateJump);
  }

  requestAnimationFrame(animateJump);
}

// Panda runs forward
function movePlayerForward() {
  const maxRight = getGameWidth() - player.offsetWidth;

  if (playerX < maxRight) {
    playerX += 2;
    player.style.left = `${playerX}px`;
  } else {
    player.style.transition = "none";
    playerX = 20;
    player.style.left = `${playerX}px`;

    requestAnimationFrame(() => {
      player.style.transition = "left 0.1s linear";
    });

    lapCount++;
    if (lapCount >= TOTAL_LAPS) {
      goal.style.display = "block";
    }

    obstacle.style.right = `-${OBSTACLE_WIDTH}px`;
  }
}

// --- Obstacle Movement ---
function updateObstaclePosition() {
  let obstacleRight =
    parseInt(getComputedStyle(obstacle).getPropertyValue("right")) || 0;

  if (obstacleRight > getGameWidth()) {
    obstacle.style.right = `-${OBSTACLE_WIDTH}px`;
    score++;
    scoreOutput.textContent = score;

    if (score % 10 === 0) {
      gameSpeed += getGameWidth() * 0.001;
    }
  } else {
    obstacle.style.right = `${obstacleRight + gameSpeed}px`;
  }
}

// --- Collision Detection ---
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();

  const hitObstacle =
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top;

  if (hitObstacle) {
    endGame(false);
    return;
  }

  if (goal.style.display === "block") {
    const reachedGoal =
      playerRect.right >= goalRect.left &&
      playerRect.left <= goalRect.right;

    if (reachedGoal) endGame(true);
  }
}

// --- Game Loop ---
function gameLoop() {
  if (!gameRunning) return;

  movePlayerForward();
  updateObstaclePosition();
  checkCollision();

  requestAnimationFrame(gameLoop);
}

// --- End Game ---
function endGame(win) {
  gameRunning = false;
  gameOverText.hidden = false;
  gameOverText.textContent = win ? "🎉 YOU WIN! 🐼" : "GAME OVER 💦";

  if (win) {
    winSound.play();
    game.style.background = "linear-gradient(to top, #73c2fb)";
    obstacle.style.display = "none";
  } else {
    gameOverSound.play();
  }
}

// --- Start Game ---
function startGame() {
  welcomeScreen.style.display = "none";
  game.hidden = false;
  setGameConfig();

  player.style.left = `${playerX}px`;
  obstacle.style.right = `-${OBSTACLE_WIDTH}px`;
  goal.style.display = "none";
  gameOverText.hidden = true;
  score = 0;
  lapCount = 0;
  playerX = 20;
  isJumping = false;
  gameRunning = true;

  gameLoop();
}

// --- Event Listeners ---
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!gameRunning) location.reload();
    else jump();
  }
}, { passive: false });

game.addEventListener("click", () => {
  if (!gameRunning) location.reload();
  else jump();
});

window.addEventListener("resize", () => {
  setGameConfig();
});

startButton.addEventListener("click", startGame);
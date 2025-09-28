// need to delete***  function startGame() {
//   // --- DOM elements ---
//   const game = document.querySelector(".game");
//   const player = document.getElementById("player");
//   const obstacle = document.getElementById("obstacle");
//   const goal = document.getElementById("goal");
//   const scoreOutput = document.getElementById("score");
//   const gameOverText = document.getElementById("game-over");

//   // --- Helpers ---
//   function getGameWidth() {
//     return game.clientWidth;
//   }
//   function getGameHeight() {
//     return game.clientHeight;
//   }

//   // --- Config ---
//   let JUMP_HEIGHT = getGameHeight() * 0.3;
//   const JUMP_SPEED = 5.5;
//   const OBSTACLE_WIDTH = getGameWidth() * 0.07;
//   const jumpSound = new Audio("./assets/sounds/jumping-sound.wav");
//   jumpSound.volume = 0.4;
//   const gameOverSound = new Audio("./assets/sounds/drowning.mp3");
//   const winSound = new Audio("./assets/sounds/game-win-other.mp3");

//   const TOTAL_LAPS = 2;

//   // --- State ---
//   let isJumping = false;
//   let score = 0;
//   let gameSpeed = getGameWidth() * 0.01;
//   let gameRunning = true;
//   let playerX = 20;
//   let lapCount = 0;

//   // Initially hide the goal
//   goal.style.display = "none";

//   // --- Jump ---
//   function jump() {
//     if (isJumping) return;
//     isJumping = true;

//     jumpSound.pause();
//     jumpSound.currentTime = 0;
//     jumpSound.play().catch((err) => console.error("Jump sound error:", err));

//     let bottom = 0;
//     let goingUp = true;

//     function animateJump() {
//       if (!goingUp && bottom <= 0) {
//         isJumping = false;
//         return;
//       }
//       if (goingUp && bottom >= JUMP_HEIGHT) {
//         goingUp = false;
//       }

//       bottom += goingUp ? JUMP_SPEED : -JUMP_SPEED;
//       player.style.bottom = `${bottom}px`;
//       player.style.left = `${playerX}px`;

//       requestAnimationFrame(animateJump);
//     }
//     requestAnimationFrame(animateJump);
//   }

//   // Panda runs forward
//   function movePlayerForward() {
//     if (!gameRunning) return;

//     const maxRight = getGameWidth() - player.offsetWidth;

//     if (playerX < maxRight) {
//       playerX += 2;
//       player.style.left = `${playerX}px`;
//     } else {
//       // --- Temporarily disable transition for instant reposition ---
//       player.style.transition = "none";
//       playerX = 20;
//       player.style.left = `${playerX}px`;

//       // Re-enable transition after a frame
//       requestAnimationFrame(() => {
//         player.style.transition = "left 0.1s linear";
//       });

//       lapCount++;
//       if (lapCount >= TOTAL_LAPS) {
//         goal.style.display = "block";
//       }

//       // Reset obstacle position
//       obstacle.style.right = `-${OBSTACLE_WIDTH}px`;
//     }
//   }

//   // Move obstacle from right to left
//   function updateObstaclePosition() {
//     let obstacleRight =
//       parseInt(getComputedStyle(obstacle).getPropertyValue("right")) || 0;

//     if (obstacleRight > getGameWidth()) {
//       obstacle.style.right = `-${OBSTACLE_WIDTH}px`;
//       score++;
//       scoreOutput.textContent = score;

//       if (score % 10 === 0) {
//         gameSpeed += getGameWidth() * 0.001;
//       }
//     } else {
//       obstacle.style.right = `${obstacleRight + gameSpeed}px`;
//     }
//   }

//   function checkCollision() {
//     const playerRect = player.getBoundingClientRect();
//     const obstacleRect = obstacle.getBoundingClientRect();
//     const goalRect = goal.getBoundingClientRect();

//     const hitObstacle =
//       playerRect.left < obstacleRect.right &&
//       playerRect.right > obstacleRect.left &&
//       playerRect.top < obstacleRect.bottom &&
//       playerRect.bottom > obstacleRect.top;

//     if (hitObstacle) {
//       endGame(false);
//       return;
//     }

//     // Only check goal collision if goal is visible
//     if (goal.style.display === "block") {
//       const reachedGoal =
//         playerRect.right >= goalRect.left && playerRect.left <= goalRect.right;

//       if (reachedGoal) {
//         endGame(true);
//       }
//     }
//   }

//   function gameLoop() {
//     if (!gameRunning) return;

//     movePlayerForward();
//     updateObstaclePosition();
//     checkCollision();

//     requestAnimationFrame(gameLoop);
//   }

//   function endGame(win) {
//     gameRunning = false;
//     gameOverText.hidden = false;
//     gameOverText.textContent = win ? "🎉 YOU WIN! 🐼" : "GAME OVER 💦";

//     if (win) {
//       winSound.play();
//       game.style.background = "linear-gradient(to top, #73c2fb";
//       obstacle.style.display = "none";
//     } else {
//       gameOverSound.play();
//     }
//   }

//   // Controls
//   document.addEventListener(
//     "keydown",
//     (e) => {
//       if (e.code === "Space") {
//         e.preventDefault();
//         if (!gameRunning) {
//           location.reload();
//         } else {
//           jump();
//         }
//       }
//     },
//     { passive: false }
//   );

//   game.addEventListener("click", () => {
//     if (!gameRunning) {
//       location.reload();
//     } else {
//       jump();
//     }
//   });

//   // Resize
//   window.addEventListener("resize", () => {
//     JUMP_HEIGHT = getGameHeight() * 0.3;
//   });

//   // Start loop
//   obstacle.style.right = `-${OBSTACLE_WIDTH}px`;
//   gameLoop();
// }

// // Start game
// startGame();

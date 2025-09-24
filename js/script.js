function startGame() {
  // --- DOM elements ---
  const game = document.querySelector(".game");
  const player = document.getElementById("player");
  const obstacle = document.getElementById("obstacle");
  const goal = document.getElementById("goal");
  const scoreOutput = document.getElementById("score");
  const gameOverText = document.getElementById("game-over");

  // Expose a tiny debug handle for the console (use _dbg.* in DevTools)
  // window._dbg = { game, player, obstacle, goal };

  // --- Helpers ---
  function getGameWidth() {
    return game.clientWidth;
  }
  function getGameHeight() {
    return game.clientHeight;
  }

  // --- Config (relative to game size) ---
  let JUMP_HEIGHT = getGameHeight() * 0.5; // 50% of game height
  const JUMP_SPEED = 5;
  const OBSTACLE_WIDTH = getGameWidth() * 0.07; // ~7% like CSS

  // --- State ---
  let isJumping = false;
  let score = 0;
  let gameSpeed = 5;
  let gameRunning = true;

  // --- Jump ---
  function jump() {
    if (isJumping) return;
    isJumping = true;

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

      requestAnimationFrame(animateJump);
    }

    requestAnimationFrame(animateJump);
  }

  // Expose jump for console testing: _dbg.jump()
  // window._dbg = { game, player, obstacle, goal };

  // --- Move obstacle ---
  function updateObstaclePosition() {
    let obstacleRight =
      parseInt(getComputedStyle(obstacle).getPropertyValue("right"), 10) || 0;

    if (obstacleRight > getGameWidth()) {
      obstacle.style.right = `-${OBSTACLE_WIDTH}px`; // reset off-screen
      score++;
      scoreOutput.value = score;
      if (score % 5 === 0) gameSpeed += 1;
    } else {
      obstacle.style.right = `${obstacleRight + gameSpeed}px`;
    }
  }

  // --- Collision detection ---
  function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
   console.log("Obstacle:", obstacleRect);
    const goalRect = goal.getBoundingClientRect();
    
    // console.log("Goal:", goalRect);

    // --- Lose if Panda hits obstacle ---
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      endGame(false);
    }

    // --- Win if Panda reaches boat (horizontal overlap is enough) ---
    if (
      playerRect.right >= goalRect.left &&
      playerRect.left <= goalRect.right
    ) {
      endGame(true);
    }
  }

  // Game loop
  function gameLoop() {
    if (!gameRunning) return;
    updateObstaclePosition();
    checkCollision();
    requestAnimationFrame(gameLoop);
  }

  // End game
  function endGame(win) {
    gameRunning = false;
    gameOverText.hidden = false;
    gameOverText.textContent = win ? "YOU WIN! 🐼🚤" : "GAME OVER 💦";
  }

  // Controls
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!gameRunning) {
          location.reload();
        } else {
          jump();
        }
      }
    },
    { passive: false }
  );

  game.addEventListener("click", () => {
    if (!gameRunning) {
      location.reload();
    } else {
      jump();
    }
  });

  // Resize
  window.addEventListener("resize", () => {
    JUMP_HEIGHT = getGameHeight() * 0.5;
  });

  // Start loop
  gameLoop();
}

// Start game
startGame();

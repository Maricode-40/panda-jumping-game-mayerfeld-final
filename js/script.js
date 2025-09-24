function startGame() {
  // --- DOM elements ---
  const game = document.querySelector(".game");
  const player = document.getElementById("player");
  const obstacle = document.getElementById("obstacle");
  const goal = document.getElementById("goal");
  const scoreOutput = document.getElementById("score");
  const gameOverText = document.getElementById("game-over");
  
  /**    TEST SOUND 
  const testBtn = document.getElementById("test-btn");
  testBtn.addEventListener("click", () => {
  jumpSound.currentTime = 0;
  jumpSound.play()
    .then(() => console.log( "Test sound played"))
    .catch(err => console.error("Sound blocked:", err));
});
*/

  // --- Helpers ---
  function getGameWidth() {
    return game.clientWidth;
  }
  function getGameHeight() {
    return game.clientHeight;
  }

  // --- Config (relative to game size) ---
  let JUMP_HEIGHT = getGameHeight() * 0.30; // let update on resize
  const JUMP_SPEED = 5.5;
  const OBSTACLE_WIDTH = getGameWidth() * 0.07; //const, never changes
  const jumpSound = new Audio("../assets/sounds/jumping-sound.wav");
  jumpSound.volume = 0.4;

  // --- State ---
  let isJumping = false;
  let score = 0;
  let gameSpeed = getGameWidth() * 0.01; // 0.1 of game width per frame
  let gameRunning = true;
  let playerX = 20;


  // --- Jump ---
  function jump() {
    if (isJumping) return;
    isJumping = true;

    jumpSound.currentTime = 0.8;
    jumpSound.play();


    let bottom = 0;
    let goingUp = true;

    function animateJump() {
      if (!goingUp && bottom <= 0) {
        isJumping = false;
        return;
      }
      if (goingUp && bottom >= JUMP_HEIGHT) {
        goingUp = false;
      }

      bottom += goingUp ? JUMP_SPEED : -JUMP_SPEED;
      player.style.bottom = `${bottom}px`;
      player.style.left = `${playerX}px`;

      requestAnimationFrame(animateJump);
    }

    requestAnimationFrame(animateJump);
  }

  // Panda runs forward
  function movePlayerForward() {
    if (!gameRunning) return;
    playerX += 2;
    player.style.left = `${playerX}px`;
  }

  // --- Move obstacle ---
  function updateObstaclePosition() {
    let obstacleRight =
      parseInt(getComputedStyle(obstacle).getPropertyValue("right")) || 0;

    if (obstacleRight > getGameWidth()) {
      obstacle.style.right = `-${OBSTACLE_WIDTH}px`; // reset off-screen
      score++;
      scoreOutput.value = score;

      if (score % 10 === 0) {
        gameSpeed += getGameWidth() * 0.002;
      }
    } else {
      obstacle.style.right = `${obstacleRight + gameSpeed}px`;
    }
  }

  // --- Collision detection ---
  function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();

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

    movePlayerForward();
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

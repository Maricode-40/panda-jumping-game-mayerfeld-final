/*THE WRAPPER */
function startGame() {
  /*GRAB YOUR ELEMENTS- these connect your js with your html */
  const game = document.querySelector(".game");
  const player = document.getElementById("player");
  const obstacle = document.getElementById("obstacle");
  const goal = document.getElementById("goal");
}

/*HELPERS AND CONFIG*/
const JUMP_HEIGHT = 120;
const JUMP_SPEED = 5;


/*STATE These are variables that change during the game:*/
let isJumping = false;
let score = 0;
let gameRunning = true;


/*JUMP BEHAVIOUR*/
function jump() {
  if (isJumping){ 
    return;
  }
  isJumping = true;
  let bottom = 0;
  let goingUp = true;

  function animateJump(){
    if (!goingUp && bottom <= 0){
      isJumping = false;
      return;
    }
    if(goingUp && bottom >= JUMP_HEIGHT){
      goingUp = false;
      bottom += goingUp ? JUMP_SPEED : -JUMP_SPEED;
      player.style.bottom = `${bottom}px`;
      requestAnimationFrame(animateJump);
       } 
      requestAnimationFrame(animateJump);
  }
}




/*MOVE OBSTACLES*/

/*COLLISION DETECTION   // Hit obstacle = lose*/

/*controls key boards spacebar*/
/Keyboard (Spacebar)/
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!gameRunning) {
      location.reload();
    } else {
      jump();
    }
  }
});

// Mouse click Touch tap
game.addEventListener("click", () => {
  if (!gameRunning) {
    location.reload();
  } else {
    jump();
  }
});

/*rezie adjustments*/

/*end dame*/

/*start it all with a loop -infitnite GAME LOOP/   // Reach goal = win*/



game.addEventListener("click", () => {
  if (!gameRunning) {
    location.reload();
  } else {
    jump();
  }
});
/*start the game the wrapper*/
startGame();

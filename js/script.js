/*THE WRAPPER */
function startGame() {
  /*GRAB YOUR ELEMENTS- these connect your js with your html */
  const game = document.querySelector(".game");
  const player = document.getElementById("player");
  const obstacle = document.getElementById("obstacle");
  const goal = document.getElementById("goal");
}

/*HELPERS AND CONFIG*/

/*STATE These are variables that change during the game:*/
let isJumping = false;
let score = 0;

/*JUMP BEHAVIOUR*/
function jump() {
  if (isJumping) return;
  isJumping = true;
  
}

/*MOVE OBSTACLES*/

/*COLLISION DETECTION   // Hit obstacle = lose*/

/*controls key boards spacebar*/

/*rezie adjustments*/

/*end dame*/

/*start it all with a loop -infitnite GAME LOOP/   // Reach goal = win*/

/*start the game the wrapper*/
startGame();

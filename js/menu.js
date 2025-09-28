const canvas = document.getElementById("menuCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawMenu() {
  ctx.fillStyle = "#b3e5fc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#01579b";
  ctx.font = "bold 48px Roboto";
  ctx.textAlign = "center";
  ctx.fillText("🐼 Panda Jump", canvas.width / 2, canvas.height / 2 - 40);

  ctx.font = "26px Roboto";
  ctx.fillText(
    "Press Space or click to start",
    canvas.width / 2,
    canvas.height / 2 + 20
  );
}

drawMenu();

function startGame() {
  window.location.href = "pages/level1.html";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    startGame();
  }
});
canvas.addEventListener("click", startGame);

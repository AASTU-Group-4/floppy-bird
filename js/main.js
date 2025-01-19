import Game from "./Game.js";
import Bird from "./Bird.js";

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const pauseScreen = document.getElementById("pauseScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const resumeButton = document.getElementById("resumeButton");
const finalScore = document.getElementById("finalScore");

const game = new Game();
game.start();

function startGame() {
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  Game.gamePaused = false;
  Game.isrunning = true;
  game.gameLoop();
}



function pauseGame() {
  if (!Game.isrunning || Game.gamePaused) return;
  Game.gamePaused = true;
  pauseScreen.classList.remove("hidden");
}

function resumeGame() {
  if (!Game.gamePaused) return;
  Game.gamePaused = false;
  pauseScreen.classList.add("hidden");
}

function restartGame() {

  gameOverScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");

  game.restart();
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
resumeButton.addEventListener("click", () => {
  if (Game.gamePaused) {
    resumeGame();
  } else {
    pauseGame();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyP") {
    if (Game.gamePaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});

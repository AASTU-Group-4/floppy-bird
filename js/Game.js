import Background from "./Background.js";
import Bird from "./Bird.js";
import PipeManager from "./PipeManager.js";

class Game {
  static isrunning = false;
  static gamePaused = false;
  static deltaTime = 0;
  static score = 0;

  constructor() {
    const canvas = document.getElementById("gameCanvas");
    this.ctx = canvas.getContext("2d");
    this.canvasSize = [canvas.width, canvas.height];

    this.bird = new Bird(
      100,
      this.canvasSize[1] / 2,
      this.ctx,
      this.canvasSize
    );
    this.pipeM = new PipeManager(this.ctx, this.canvasSize);

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.bird.flopp();
      }
    });

    this.lastTime = 0;

    this.background = new Background(this.ctx, this.canvasSize);

    this.gameLoop = (currentTime) => {
      if (!Game.gamePaused) {
        Game.deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.render();
        this.check();
        this.update();

        if (!Game.isrunning) return;
      }

      requestAnimationFrame(this.gameLoop);
    };
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);
    this.background.render();

    this.bird.render();
    this.pipeM.render();

    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      `Score: ${Math.floor(Game.score)}`,
      this.canvasSize[0] / 2 - 50,
      30
    );
  }

  check() {
    if (!this.bird.check() || this.pipeM.check(this.bird.position)) {
      Game.isrunning = false;
      gameOverScreen.classList.remove("hidden");
      finalScore.textContent = `Your Score: ${Game.score}`;
    }
  }

  update() {
    this.background.update();
    this.bird.update();
    this.pipeM.update();
  }

  start() {
    requestAnimationFrame(this.gameLoop);
  }

  restart() {
    Game.isrunning = true;
    Game.gamePaused = false;
    Game.score = 0;

    this.bird = new Bird(
      100,
      this.canvasSize[1] / 2,
      this.ctx,
      this.canvasSize
    );
    this.pipeM = new PipeManager(this.ctx, this.canvasSize);

    this.gameLoop();
  }
}

export default Game;

import Game from "./Game.js";

class Pipe {
  constructor(position, width, speed, gap) {
    this.position = position;
    this.width = width;
    this.speed = speed;
    this.gap = gap;
  }

  update() {
    this.position[0] -= this.speed; // Move pipe left
  }

  render(ctx, canvasSize) {
    ctx.fillStyle = "green";

    // Set shadow properties
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Draw top pipe
    ctx.fillRect(this.position[0], 0, this.width, this.position[1]);

    // Draw bottom pipe
    ctx.fillRect(
      this.position[0],
      this.position[1] + this.gap,
      this.width,
      canvasSize[1] - (this.position[1] + this.gap)
    );

    // Reset shadow to avoid affecting other objects
    ctx.shadowColor = "transparent";
  }

  isOffScreen() {
    const val = this.position[0] + this.width < 0;
    if (val) {
      Game.score += 5;
    }
    return val;
  }
}
export default Pipe;

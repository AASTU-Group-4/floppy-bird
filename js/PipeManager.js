import Pipe from "./Pipe.js";

class PipeManager {
    constructor(ctx, canvasSize) {
      this.ctx = ctx;
      this.canvasSize = canvasSize;
      this.speed = 3;
      this.pipeGap = 150; // The space between the top and bottom pipe
      this.pipeWidth = 100;
      this.pipes = [];
      this.framesSinceLastPipe = 0;
      this.pipeFrequency = 130; // The number of frames before a new pipe is generated
    }
  
    generatePipe() {
      const x = this.canvasSize[0]; // Start the pipe off-screen to the right
      const y = Math.floor(
        Math.random() * (this.canvasSize[1] - (this.pipeGap + 50)) + 50
      ); // Random Y position for the top pipe
      const newPipe = new Pipe(
        [x, y],
        this.pipeWidth,
        this.speed,
        this.pipeGap,
        this.canvasSize[1]
      );
      this.pipes.push(newPipe);
    }
  
    update() {
      this.pipes.forEach((pipe) => pipe.update());
      this.pipes = this.pipes.filter((pipe) => !pipe.isOffScreen());
  
      this.framesSinceLastPipe++;
      if (this.framesSinceLastPipe >= this.pipeFrequency) {
        this.generatePipe();
        this.framesSinceLastPipe = 0;
      }
    }
  
    render() {
      this.pipes.forEach((pipe) => pipe.render(this.ctx, this.canvasSize));
    }
  
    check([birdX, birdY]) {
      if (this.pipes.length === 0) return false;
  
      const birdRadius = 15;
      const [pipeX, pipeY] = this.pipes[0].position;
  
      if (
        birdX + birdRadius > pipeX &&
        birdX - birdRadius < pipeX + this.pipeWidth
      ) {
        if (
          birdY - birdRadius < pipeY || // Collision with the top pipe
          birdY + birdRadius > pipeY + this.pipeGap // Collision with the bottom pipe
        ) {
          return true; // Bird collided with the pipe
        }
      }
  
      return false; // No collision detected
    }
  }
  
  export default PipeManager;
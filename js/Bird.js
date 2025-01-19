class Bird {
    constructor(x, y, ctx, canvasSize) {
      this.ctx = ctx;
      this.canvasSize = canvasSize;
      this.position = [x, y];
      this.velocity = 0;
  
      this.flopp = () => {
        if (this.position[1] > 9) this.velocity = -7;
      };
    }
  
    check() {
      if (this.position[1] >= this.canvasSize[1]) {
        return false;
      }
      return true;
    }
  
    update() {
      this.velocity += 0.3;
      this.position[1] += this.velocity;
      if (this.position[1] < 0) {
        this.position[1] = 0;
      }
    }
  
    render() {
        this.ctx.fillStyle = "yellow";
      
        // Set shadow properties
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
      
        // Draw the bird
        this.ctx.beginPath();
        this.ctx.arc(this.position[0], this.position[1], 15, 0, Math.PI * 2);
        this.ctx.fill();
      
        // Reset shadow to avoid affecting other objects
        this.ctx.shadowColor = "transparent";
      }
      
  }

  export default Bird
class Background {
    constructor(ctx, canvasSize) {
      this.ctx = ctx;
      this.canvasSize = canvasSize;
  
      // Background layers
      this.layers = [
        { image: this.loadImage("assets/images/bg.png"), speed: 0.5 },
        { image: this.loadImage("assets/images/bg.png"), speed: 1.0 },
        { image: this.loadImage("assets/images/bg.png"), speed: 1.5 },
      ];
  
      // Track the x position of each layer
      this.layerPositions = Array(this.layers.length).fill(0);
    }
  
    loadImage(src) {
      const img = new Image();
      img.src = src;
      return img;
    }
  
    update() {
      // Move each layer based on its speed
      this.layers.forEach((layer, index) => {
        this.layerPositions[index] -= layer.speed;
  
        // Reset the position when the image scrolls off the canvas
        if (this.layerPositions[index] <= -this.canvasSize[0]) {
          this.layerPositions[index] = 0;
        }
      });
    }
  
    render() {
      // Draw each layer twice for seamless scrolling
      this.layers.forEach((layer, index) => {
        const posX = this.layerPositions[index];
        this.ctx.drawImage(
          layer.image,
          posX,
          0,
          this.canvasSize[0],
          this.canvasSize[1]
        );
        this.ctx.drawImage(
          layer.image,
          posX + this.canvasSize[0],
          0,
          this.canvasSize[0],
          this.canvasSize[1]
        );
      });
    }
  }

  export default Background
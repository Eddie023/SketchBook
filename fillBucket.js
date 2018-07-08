class FillBucket {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
    this.pixelStack = [];
    this.width = $tempCanvas.width;

  }

  getPosition(x, y) {
    this.temp = [];
    this.temp.push(x);
    this.temp.push(y);
    this.pixelStack.push(this.temp);
    this.getNewPosition(this.pixelStack);

  };

  displayPosition() {
    // console.log(this.pixelStack.pop());
    // console.log(this.newPos)
    console.log(this.x, this.y);
    console.log(this.pixelData);
  };

  getNewPosition(pixelStack) {
    while (pixelStack.length) {
      this.newPos = pixelStack.pop();
      this.x = this.newPos[0];
      this.y = this.newPos[1];
      this.pixelData = this.context.getImageData(0, 0, $canvas.width, $canvas.height);
      this.colorIndex = this.getColorIndicesForCoord(this.x, this.y, this.width);
      // this.pixelPos = (this.y * 960 + this.x) * 4;
      // while (this.y-- >= 0 && this.matchStartColor(this.pixelPos)) {
      //   this.pixelPos -= 960 * 4;
      // }
    }
  };


  getColorIndicesForCoord(x, y, width) {
    this.red = this.y * (this.width * 4) + this.x * 4;
    return [this.red, this.red + 1, this.red + 2, this.red + 3];
  };


};

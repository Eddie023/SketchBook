const $canvas = document.getElementById('canvas');
const contextOrginal = $canvas.getContext('2d');
const $tempCanvas = document.createElement('canvas');
const context = $tempCanvas.getContext('2d');
const $container = $canvas.parentNode;

$canvas.width = 500;
$canvas.height = 400;

$tempCanvas.id = 'imageTemp';
$tempCanvas.width = $canvas.width;
$tempCanvas.height = $canvas.height;
$tempCanvas.style.top = $canvas.style.top;
$tempCanvas.style.left = $canvas.style.top;
$container.appendChild($tempCanvas);

let $rectangleButton = document.getElementById('shape-rectangle-button');
let $freeHandButton = document.getElementById('shape-freeHand-button');
let $circleButton = document.getElementById('shape-circle-button');
let $lineButton = document.getElementById('shape-line-button');
let $resetButton = document.getElementById('reset-button');
let $eraserButton = document.getElementById('shape-eraser-button');
let $sprayButton = document.getElementById('shape-spray-button');


// let $fillBucketButton = document.getElementById('shape-fillBucket-button');






class Canvas {
  constructor(props) {
    this.$orginalCanvas = $canvas;
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
    this.$canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.$canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.$canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.$orginalCanvas.width = props.width;
    this.$orginalCanvas.height = props.height;
    this.$canvas.width = this.$orginalCanvas.width;
    this.$canvas.height = this.$orginalCanvas.height;
    this.size = new Size();
    this.startX = 0;
    this.startY = 0;
    this.dragging = false;
    this.freeHandOption = true;
    this.rectangleOption = false;
    this.circleOption = false;
    this.lineOption = false;
    this.eraserOption = false;
    this.sprayOption = false;
    // this.fillBucketOption = false;
    this.init();
  };

  init() {
    contextOrginal.fillStyle = 'white';
    contextOrginal.fillRect(0, 0, $canvas.width, $canvas.height);
  };

  imgUpdate() {
    contextOrginal.drawImage($tempCanvas, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  getMousePos(canvas, evt) {
    this.rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - this.rect.left) / (this.rect.right - this.rect.left) * canvas.width,
      y: (evt.clientY - this.rect.top) / (this.rect.bottom - this.rect.top) * canvas.height
    };
  };

  mouseDownHandler(event) {

    this.dragging = true;
    this.startPosition = this.getMousePos($tempCanvas, event);
    this.startX = this.startPosition.x;
    this.startY = this.startPosition.y;
    this.context.moveTo(this.startX, this.startY);

    // if(this.fillBucketOption === true){
    //   this.fillBucket = new FillBucket();
    //   this.fillBucket.getPosition(this.startX,this.startY);
    //   this.fillBucket.displayPosition();
    //   // console.log(this.startX,this.startY);
    //   // console.log(this.fillBucket.x,this.fillBucket.y);
    //
    // }
  };


  mouseMoveHandler(event) {
    // this.context.beginPath();
    this.context.lineWidth = this.size.size / 2;
    this.context.strokeStyle = $input.value;
    this.context.fillStyle = $input.value;
    if (this.dragging && this.freeHandOption) {
      this.position = this.getMousePos($tempCanvas, event);
      this.freeHand = new FreeHand();
      this.freeHand.draw(this.position.x, this.position.y, this.size.size, this.angle, Math.PI * 2);
    };

    if (this.dragging && this.eraserOption) {
      this.position = this.getMousePos($tempCanvas, event);

      this.eraser = new Eraser();

      this.eraser.erase(this.position.x, this.position.y, this.size.size, this.angle, Math.PI * 2);
    };

    if (this.dragging && this.rectangleOption) {
      this.position = this.getMousePos($tempCanvas, event);
      this.rectangle = new Rectangle();
      this.context.beginPath();
      this.width = (this.position.x - this.startX);
      this.height = (this.position.y - this.startY);
      this.rectangle.draw(this.startX, this.startY, this.width, this.height);

    };
    if (this.dragging && this.circleOption) {
      this.position = this.getMousePos($tempCanvas, event);
      this.circle = new Circle();
      this.radius = Math.abs(this.position.x - this.startX);
      this.circle.draw(this.startX, this.startY, this.radius, 0, Math.PI * 2);
    }
    if (this.dragging && this.lineOption) {
      this.position = this.getMousePos($tempCanvas, event);
      this.line = new Line();
      this.line.draw(this.startX, this.startY, this.position.x, this.position.y);
    }
    if (this.dragging && this.sprayOption) {
      this.position = this.getMousePos($tempCanvas, event);
      this.spray = new Spray();
      this.radius = Math.abs(this.position.x - this.startX);
      this.spray.draw(this.position.x, this.position.y);
    }


  };
  mouseUpHandler() {

    this.context.beginPath();
    this.imgUpdate();
    this.dragging = false;
  }

  reset() {

    context.fillStyle = 'white';
    contextOrginal.fillStyle = 'white';
    context.fillRect(0, 0, $canvas.width, $canvas.height);
    contextOrginal.fillRect(0, 0, $canvas.width, $canvas.height);
  }

};



$rectangleButton.onclick = () => {
  canvas.rectangleOption = true;
  canvas.freeHandOption = false;
  canvas.circleOption = false;
  canvas.lineOption = false;
  canvas.eraserOption = false;
  canvas.sprayOption = false;
  canvas.fillBucketOption = false;
};

$freeHandButton.onclick = () => {
  canvas.freeHandOption = true;
  canvas.rectangleOption = false;
  canvas.circleOption = false;
  canvas.lineOption = false;
  canvas.eraserOption = false;
  canvas.sprayOption = false;
  canvas.fillBucketOption = false;

};


$circleButton.onclick = () => {
  canvas.circleOption = true;
  canvas.freeHandOption = false;
  canvas.rectangleOption = false;
  canvas.lineOption = false;
  canvas.eraserOption = false;
  canvas.sprayOption = false;
  canvas.fillBucketOption = false;
};

$resetButton.onclick = () => {

  // context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.reset();

};

$eraserButton.onclick = () => {
  canvas.eraserOption = true;
  canvas.lineOption = false;
  canvas.circleOption = false;
  canvas.freeHandOption = false;
  canvas.rectangleOption = false;
  canvas.sprayOption = false;
  canvas.fillBucketOption = false;



};

$sprayButton.onclick = () => {
  canvas.sprayOption = true;
  canvas.eraserOption = false;
  canvas.lineOption = false;
  canvas.circleOption = false;
  canvas.freeHandOption = false;
  canvas.rectangleOption = false;
  canvas.fillBucketOption = false;

};

$lineButton.onclick = () => {
  canvas.lineOption = true;
  canvas.circleOption = false;
  canvas.freeHandOption = false;
  canvas.rectangleOption = false;
  canvas.eraserOption = false;
  canvas.sprayOption = false;
  canvas.fillBucketOption = false;

};
//
// $fillBucketButton.onclick = () =>{
//    canvas.fillBucketOption = true;
//    canvas.lineOption = false;
//    canvas.circleOption = false;
//    canvas.freeHandOption = false;
//    canvas.rectangleOption = false;
//    canvas.eraserOption = false;
//    canvas.sprayOption = false;
//
//
// }



let canvas = new Canvas({
  width: 960,
  height: 550,
});

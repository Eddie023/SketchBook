var $input = document.getElementsByTagName('input')[0]


$input.addEventListener("change", () => {
  console.log($input.value);
  context.fillStyle = $input.value;
  context.strokeStyle = $input.value;
});




class Rectangle {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
  }

  draw(startX, startY, width, height) {
    this.context.strokeStyle = $input.value;
    this.context.rect(startX, startY, width, height);
    this.context.clearRect(0, 0, $canvas.width, $canvas.height);
    this.context.stroke();
  };
};

class FreeHand {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
  }

  draw(startX, startY, radius, angle, math) {
    this.context.lineTo(startX, startY);
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(startX, startY, radius, angle, math);
    this.context.fillStyle = $input.value;
    this.context.fill();
    this.context.beginPath();
    this.context.moveTo(startX, startY);
  };
};

class Circle {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
  }

  draw(startX, startY, radius, angle, math) {
    this.context.beginPath();
    this.context.arc(startX, startY, radius, angle, math);
    this.context.clearRect(0, 0, $canvas.width, $canvas.height);
    this.context.stroke();
  };
};


class Line {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
  }

  draw(startX, startY, endX, endY) {

    this.context.clearRect(0, 0, $canvas.width, $canvas.height);
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();
  };
};


class Spray {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');
    this.density = 40;
    this.radius = 20;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  draw(startX, startY) {
    for (var i = this.density; i--;) {
      this.offsetX = this.getRandomInt(-this.radius, this.radius);
      this.offsetY = this.getRandomInt(-this.radius, this.radius);
      this.context.fillRect(startX + this.offsetX, startY + this.offsetY, 1, 1);
    }

  };
};


class Eraser {
  constructor() {
    this.$canvas = $tempCanvas;
    this.context = this.$canvas.getContext('2d');

  }

  erase(startX, startY, radius, angle, math) {
    this.radius = radius * 2;
    this.context.lineWidth = radius * 5;
    this.context.strokeStyle = "white";
    this.context.lineTo(startX, startY);
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(startX, startY, this.radius, angle, math);

    this.context.fill();
    this.context.beginPath();
    this.context.moveTo(startX, startY);
  };
};

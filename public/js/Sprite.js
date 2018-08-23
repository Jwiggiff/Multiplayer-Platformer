class Sprite {
  constructor(animation, width, height, speed) {
    this.width = width;
    this.height = height;
    this.animation = animation;
    this.speed = speed;
    this.index = 0;
  }

  animate() {
    this.index += this.speed;
  }

  show(x, y) {
    image(this.animation[this.index % this.animation.length], x, y, this.width, this.height);
  }
}

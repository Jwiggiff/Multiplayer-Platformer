/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Author: Josh Friedman
Date Created: 2018-08-21
© Josh Friedman 2018. All Rights Reserved.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function Ground(x, y, width, height) {
  this.width = width;
  this.height = height;
  this.pos = createVector(x, y);

  this.bottom = this.pos.y + this.height;
  this.left = this.pos.x;
  this.right = this.pos.x + this.width;
  this.top = this.pos.y;

  this.show = function() {
    fill('blue');
    rect(this.pos.x,this.pos.y,this.width,this.height);
  }
}

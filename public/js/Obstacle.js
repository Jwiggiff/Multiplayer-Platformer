/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Author: Josh Friedman
Date Created: 2018-08-21
© Josh Friedman 2018. All Rights Reserved.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function Obstacle(x) {
  this.width = 30;
  this.height = Math.floor(random(20,60));
  this.pos = createVector(x,height-this.height);

  this.bottom = this.pos.y + this.height;
  this.left = this.pos.x;
  this.right = this.pos.x + this.width;
  this.top = this.pos.y;

  this.show = function() {
    fill('red');
    rect(this.pos.x,this.pos.y,this.width,this.height);
  }
}

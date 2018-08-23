/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Author: Josh Friedman
Date Created: 2018-08-21
© Josh Friedman 2018. All Rights Reserved.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

class Player {
  constructor() {
    this.pos = createVector(50,352);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.width = 36;
    this.height = 48;
    this.jump = createVector(0, -6);
    this.jumping = false;
    this.sprite = loadImage("img/player-01.png");
  }

  bottom() { return this.pos.y + this.height; };
  left() { return this.pos.x; };
  right() { return this.pos.x + this.width; };
  top() { return this.pos.y; };

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }

  show() {
    image(this.sprite, this.pos.x, this.pos.y, this.width, this.height);
    /*
    this.sprite.show(this.pos.x, this.pos.y);
    this.sprite.animate();
    */
  }

  edges(grounds) {
    //bottom of canvas
    if (this.pos.y > height-this.height) {
      this.vel.y *= 0;
      this.pos.y = height-this.height;
      this.jumping = false;
    }

    //grounds
    for (let i = 0; i < grounds.length; i++) {
      //Right of player
      if (this.right() >= grounds[i].left && this.bottom() <= grounds[i].bottom && this.bottom() > grounds[i].top+5 && this.left() < grounds[i].left) {
        this.vel.x *= 0;
        this.pos.x = grounds[i].left-this.width;

      //Left of player
      } else if (this.left() <= grounds[i].right && this.bottom() <= grounds[i].bottom && this.bottom() > grounds[i].top+5 && this.right() > grounds[i].right) {
        this.vel.x *= 0;
        this.pos.x = grounds[i].right;

      //Bottom of player
    } else if (this.right() > grounds[i].left && this.bottom() >= grounds[i].top && this.left() < grounds[i].right && this.top() <= grounds[i].bottom && this.bottom() < grounds[i].bottom) {
        this.vel.y *= 0;
        this.pos.y = grounds[i].top-this.height;
        this.jumping = false;

      // Top of player
    } else if (this.right() > grounds[i].left && this.top() <= grounds[i].bottom && this.left() < grounds[i].right && this.bottom() >= grounds[i].top) {
        this.vel.y *= 0;
        this.pos.y = grounds[i].bottom;
      }
    }
  }

  isDead(obstacles) {
    for (i = 0; i < obstacles.length; i++) {
      if (collideRectRect(this.pos.x,this.pos.y,this.width,this.height,obstacles[i].pos.x,obstacles[i].pos.y,obstacles[i].width,obstacles[i].height)) {
        return true;
      }
    }
    return false;
  }
}


/*
Player() {

  this.pos = createVector(50,352);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.width = 36;
  this.height = 48;
  this.jump = createVector(0, -6);
  this.jumping = false;
  this.sprite = loadImage("img/player-01.png");


  this.animation = [];

  for (var i = 0; i < 9; i++) {
    var img = loadImage("img/player/frame_" + i + ".png");
    this.animation.push(img);
  }

  this.sprite = new Sprite(this.animation, this.width, this.height, 1);//loadImage("https://i.imgur.com/ebqNvp9.png");


  this.bottom = function() { return this.pos.y + this.height; };
  this.left = function() { return this.pos.x; };
  this.right = function() { return this.pos.x + this.width; };
  this.top = function() { return this.pos.y; };

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }

  this.show = function() {
    image(this.sprite, this.pos.x, this.pos.y, this.width, this.height);

    this.sprite.show(this.pos.x, this.pos.y);
    this.sprite.animate();

  }

  this.edges = function(grounds) {
    //bottom of canvas
    if (this.pos.y > height-this.height) {
      this.vel.y *= 0;
      this.pos.y = height-this.height;
      this.jumping = false;
    }

    //grounds
    for (i = 0; i < grounds.length; i++) {
      //Right of player
      if (this.right() >= grounds[i].left && this.bottom() <= grounds[i].bottom && this.bottom() > grounds[i].top+5 && this.left() < grounds[i].left) {
        this.vel.x *= 0;
        this.pos.x = grounds[i].left-this.width;

      //Left of player
      } else if (this.left() <= grounds[i].right && this.bottom() <= grounds[i].bottom && this.bottom() > grounds[i].top+5 && this.right() > grounds[i].right) {
        this.vel.x *= 0;
        this.pos.x = grounds[i].right;

      //Bottom of player
    } else if (this.right() > grounds[i].left && this.bottom() >= grounds[i].top && this.left() < grounds[i].right && this.top() <= grounds[i].bottom && this.bottom() < grounds[i].bottom) {
        this.vel.y *= 0;
        this.pos.y = grounds[i].top-this.height;
        this.jumping = false;

      // Top of player
    } else if (this.right() > grounds[i].left && this.top() <= grounds[i].bottom && this.left() < grounds[i].right && this.bottom() >= grounds[i].top) {
        this.vel.y *= 0;
        this.pos.y = grounds[i].bottom;
      }
    }
  }

  this.isDead = function(obstacles) {
    for (i = 0; i < obstacles.length; i++) {
      if (collideRectRect(this.pos.x,this.pos.y,this.width,this.height,obstacles[i].pos.x,obstacles[i].pos.y,obstacles[i].width,obstacles[i].height)) {
        return true;
      }
    }
    return false;
  }
}
*/

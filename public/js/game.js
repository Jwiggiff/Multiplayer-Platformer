/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Author: Josh Friedman
Date Created: 2018-08-21
Description: This is a classic platformer game

© Josh Friedman 2018. All Rights Reserved.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var socket;

var player;

var simplePlayer;

var players = {};

var obstacles = [];

var grounds = [];

var left,right = false;

var player1;

function gameOver() {
  player = new Player();
  player.vel.x = 2;
  obstacles = [];
  //translate(0, 0);
  obstacles[0] = new Obstacle(player.pos.x+width-50);
  speedupCounter = 0;
}

function preload() {
  player1 = loadImage("img/player-01.png");

  socket = io();
}

function setup() {
  createCanvas(600, 400);
  player = new Player();
  obstacles[0] = new Obstacle(player.pos.x+width-50);

  socket.on('playerUpdate', function(data) {
    //console.log('playerUpdate event received');
    if (typeof players[data.id] == "undefined") {
      data.sprite = player1;
      players[data.id] = data;
    } else {
      players[data.id].x = data.x;
      players[data.id].y = data.y;
    }
  });

  socket.on('playerLeft', function(id) {
    delete players[id];
  });

  /*
  for (var i = 0; i < 7; i++) {
    grounds[i] = new Ground(200+(i+1)*30, height-(i+1)*30, 400-(i+1)*30, 30);
  }
  */

  grounds[0] = new Ground(200, height-30, 400, 30);
  grounds[1] = new Ground(0, height-150, 400, 30);

  simplePlayer = {
    id: socket.json.id,
    x: player.pos.x,
    y: player.pos.y,
    width: player.width,
    height: player.height
  };
}

function keyPressed() {
  //Up arrow
  if (keyCode == 38 && !player.jumping) {
    player.applyForce(player.jump);
    player.jumping = true;
  }
}

function draw() {
  background("#202020");

  //translate(-player.pos.x+50, 0);

  if (keyIsDown(LEFT_ARROW)) {
    var left = createVector(-0.5, 0);
    player.applyForce(left);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    var right = createVector(0.5, 0);
    player.applyForce(right);
  }

  var gravity = createVector(0, 0.1);
  player.applyForce(gravity);
  //friction
  player.vel.x *= 0.9;

  simplePlayer.x = player.pos.x;
  simplePlayer.y = player.pos.y;
  socket.emit('playerUpdate', simplePlayer);

  player.update();
  player.edges(grounds);
  player.show();

  for (i in players) {
    image(players[i].sprite, players[i].x, players[i].y, players[i].width, players[i].height);
  }

  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }

  for (i = 0; i < grounds.length; i++) {
    grounds[i].show();
  }

  if (player.isDead(obstacles)) {
    gameOver();
  }
}

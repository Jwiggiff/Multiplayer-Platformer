var express = require('express');
var socket = require('socket.io');

console.log('Server has started.');

var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {
  console.log('New Connection: '+ socket.id);

  socket.on('newPlayer', function(data) {
    //console.log('player sent: ' + JSON.stringify(data));
    socket.broadcast.emit('newPlayer', data);
  });

  socket.on('playerUpdate', function(data) {
    //console.log('player sent: ' + JSON.stringify(data));
    socket.broadcast.emit('playerUpdate', data);
  });
});

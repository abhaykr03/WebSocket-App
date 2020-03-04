var express = require("express");
var socket = require("socket.io");

//App SetUp
var app = express();
var server = app.listen(4000, function() {
  console.log("listening to requests on port 4000");
});

//Static files
app.use(express.static("public"));

//Socket Setup
var io = socket(server);

io.on("connection", function(socket) {
  console.log("made socket connection", socket.id);

  //Handle chat events
  socket.on("chat", function(data) {
    //server is listening to the emit events & as soon as the data is received it passes it to the  function
    io.sockets.emit("chat", data); //so after the data is passed to function it emits the message to all the clients on the server
  });
  socket.on("typing", function(data) {
    //broadcasting the message to all other users
    socket.broadcast.emit("typing", data);
  });
});

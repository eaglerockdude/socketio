let app = require('express')();  // invoke it after

let http = require('http').createServer(app);

let io = require('socket.io')(http);

// app is a function handler that we can supply to an HTTP server(above)
app.get('/', (req,res) => {
  //res.send('<h2>Dude, where is my car?</h2>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000,() => {
  console.log('listening on *:3000');
});




const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/hello', (req, res) => {
  res.send('hello');
});

let connectedPeers = [];

io.on('connection', (socket) => {
  console.log('user connected to socket.io server');
  connectedPeers.push(socket.id);
  console.log('connectedPeers: ', connectedPeers);

  socket.on('message', (arg, callback) => {
    console.log('log--arg ', arg); // "world"
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;
    console.log('disconnect connectedPeers: ', connectedPeers);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const rooms = new Map();
const className = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // socket.on('existroom', () => {
  //   const roomList = Array.from(rooms.keys());
  //   socket.emit('hasroom', roomList);
  //   console.log(rooms);
  // });

  socket.on('createRoom', (roomId, classname) => {
    if (!rooms.has(roomId) && !className.has(roomId)) {
      rooms.set(roomId, new Set()); 
      className.set(roomId, classname); 
      rooms.get(roomId).add(socket.id); 
      socket.join(roomId);
      socket.emit('roomCreated', roomId);
      console.log("User created room:", roomId);
    } else {
      socket.emit('error', 'Room already exists');
    }
    console.log(rooms, className);
  });

  socket.on('joinRoom', (roomId) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).add(socket.id);
      socket.join(roomId); 
      socket.emit('joinRoomResponse', { success: true });
      console.log("User joined room:", roomId);
    } else {
      socket.emit('joinRoomResponse', { success: false});
    }
  });
  

  socket.on("joinedRoom", (roomId) => { 
    const cn = className.get(roomId)

    if (cn) { 
      socket.emit("getClassName",cn)
    } 
  })

  socket.on('sendMessage', (roomId, message) => {
    if (rooms.has(roomId)) {
      io.to(roomId).emit('receiveMessage', { id: socket.id, message });
      console.log(`Message sent to roomId:${roomId}, socket.id:${socket.id}, message:${message}`);
    } else {
      console.log(`Room ${roomId} does not exist`);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    rooms.forEach((clients, roomId) => {
      clients.delete(socket.id);
      if (clients.size === 0) {
        rooms.delete(roomId); 
        className.delete(roomId); 
      }
    });
    console.log("current rooms", rooms);
    console.log("current classname", className);
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
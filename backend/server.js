const express = require("express");
const cors = require('cors');
const { Server } = require("socket.io");
const { createServer } = require("http");

const testRouter = require("./routes/test")

const app = express();

app.use(express.json());
app.use(cors())

app.use('/test',testRouter);

const server = createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// io.on("connection", (socket) => {
//   console.log("socket connected");
  
//   socket.on('disconnect', () => {
//     console.log('socket disconnected');
//   });
// });

server.listen(4000, () => {
  console.log("Server Started on PORT:", 4000);
});

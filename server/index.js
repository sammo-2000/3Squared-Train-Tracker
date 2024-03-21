const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const getMovmentData = require("./API/movmentApi");
app.use(cors({ origin: "http://localhost:3000" }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let socketID = [];

io.on("connection", (socket) => {
  socket.on("FTBSetDetails", async (data) => {
    socketID.push({ id: socket.id, data });
    socket.emit("BTFSetMovment", await updatedMovmentData(data));
  });
});

setInterval(() => {
  socketID.forEach(async (element) => {
    io.to(element.id).emit(
      "BTFSetMovment",
      await updatedMovmentData(element.data)
    );
  });
}, 5000);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const updatedMovmentData = async (data) => {
  data.forEach(async (element) => {
    const activationId = element.tiploc.activationId;
    const scheduleId = element.tiploc.scheduleId;

    // Get updated movment data
    const movmentData = await getMovmentData(activationId, scheduleId);

    element.movment = movmentData;
  });
  return data;
};

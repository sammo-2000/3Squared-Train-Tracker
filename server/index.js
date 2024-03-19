const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let TrackedTrainInfo = [];

io.on("connection", (socket) => {
  // Listen for new data from the client
  socket.on("updateTrackedLocations", (data) => {
    TrackedTrainInfo = [];
    data.forEach((element) => {
      // TrackedTrainInfo.push({
      //   activationId: element.tiploc.activationId,
      //   scheduleId: element.tiploc.scheduleId,
      // });
      TrackedTrainInfo.push(element.tiploc);
    });
  });

  // Send new data to all connected clients
  setInterval(async () => {
    // Get updated information
    const newData = await fetchdata();

    // Send updated information to all connected clients
    socket.emit("updatedTrackedRoutes", newData);
  }, 60000);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const fetchdata = async () => {
  let data = [];

  await Promise.all(
    TrackedTrainInfo.map(async (element) => {
      const movment = await getMovementData(
        element.activationId,
        element.scheduleId
      );
      const schedule = await getScheduleData(
        element.activationId,
        element.scheduleId
      );

      data.push({ tiploc: element, movment, schedule });
    })
  );

  return data;
};

const getMovementData = async (activationId, scheduleId) => {
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/ifmtrains/movement/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
};

const getScheduleData = async (activationId, scheduleId) => {
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/ifmtrains/schedule/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
};

import { useEffect, useRef } from "react";
import io from "socket.io-client";

// Hooks
import { UseTrackedRoutes } from "./hooks/TrackedRoutesHook";

// Connect to backend, this is used to know where the backend socket URL is
const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:4000");

const Socket = () => {
  // Context
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

  socket.on("BTFSetMovment", (data) => {
    // console.log(trackedRoutes.length);
  });

  useEffect(() => {
    socket.emit("FTBSetDetails", trackedRoutes);
  }, [trackedRoutes, setTrackedRoutes]);

  // Return null so nothing is being outputted onto the screen
  // This is just a helper component to handle socket connections
  return null;
};

export default Socket;

import React, { useEffect } from "react";
import io from "socket.io-client";

// Hooks
import { UseTrackedRoutes } from "./hooks/TrackedRoutesHook";

// Connect to backend
const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:4000");

const Socket = () => {
  // Context
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

  // Update tracked routes
  useEffect(() => {
    socket.on("updatedTrackedRoutes", (data) => {
      setTrackedRoutes(data);
    });
  }, [socket]);

  // Update tracked location in backend
  useEffect(() => {
    socket.emit("updateTrackedLocations", trackedRoutes);
  }, [trackedRoutes]);

  // Return nothing, we using this component for it side effects on context
  return null;
};

export default Socket;

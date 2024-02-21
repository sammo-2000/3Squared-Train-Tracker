import { useState, createContext } from "react";

export const TrackedLocationsContext = createContext();

export const TrackedLocationsProvider = ({ children }) => {
  const [trackedLocations, setTrackedLocations] = useState([]);
  return (
    <TrackedLocationsContext.Provider
      value={{ trackedLocations, setTrackedLocations }}
    >
      {children}
    </TrackedLocationsContext.Provider>
  );
};

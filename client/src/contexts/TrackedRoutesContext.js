import { useState, createContext } from "react";

export const TrackedRoutesContext = createContext();

export const TrackedRoutesProvider = ({ children }) => {
  const [trackedRoutes, setTrackedRoutes] = useState([]);
  return (
    <TrackedRoutesContext.Provider value={{ trackedRoutes, setTrackedRoutes }}>
      {children}
    </TrackedRoutesContext.Provider>
  );
};

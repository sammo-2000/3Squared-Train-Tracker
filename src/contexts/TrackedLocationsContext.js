import { useState, createContext } from "react";

export const TrackedLocationsContext = createContext();

export const TrackedLocationsProvider = ({ children }) => {
  const [selectedTiploc, setSelectedTiploc] = useState([]);
  return (
    <TrackedLocationsContext.Provider
      value={{ selectedTiploc, setSelectedTiploc }}
    >
      {children}
    </TrackedLocationsContext.Provider>
  );
};

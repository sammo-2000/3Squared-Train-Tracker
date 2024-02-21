import { useState, createContext } from "react";

export const TrackedRoutesContext = createContext();

export const TrackedRoutesProvider = ({ children }) => {
  const [trainDetail, setTrainDetail] = useState([]);
  return (
    <TrackedRoutesContext.Provider value={{ trainDetail, setTrainDetail }}>
      {children}
    </TrackedRoutesContext.Provider>
  );
};

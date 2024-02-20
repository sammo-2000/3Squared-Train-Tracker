import { useState, createContext } from "react";

export const TrainDetailContext = createContext();

export const TrainDetailProvider = ({ children }) => {
  const [trainDetail, setTrainDetail] = useState([]);
  return (
    <TrainDetailContext.Provider value={{ trainDetail, setTrainDetail }}>
      {children}
    </TrainDetailContext.Provider>
  );
};

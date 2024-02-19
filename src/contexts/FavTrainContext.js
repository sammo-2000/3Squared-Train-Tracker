import { useState, createContext } from "react";

export const FavTrainContext = createContext();

export const FavTrainProvider = ({ children }) => {
  const [favTrain, setFavTrain] = useState([]);
  return (
    <FavTrainContext.Provider value={{ favTrain, setFavTrain }}>
      {children}
    </FavTrainContext.Provider>
  );
};

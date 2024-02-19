import { FavTrainContext } from "../contexts/FavTrainContext.js";
import { useContext } from "react";

export const useFavTrain = () => {
  const context = useContext(FavTrainContext);

  if (!context)
    throw new Error("useFavTrain must be used within a FavTrainProvider");

  return context;
};

import { useContext } from "react";
import { TrainDetailContext } from "../contexts/TrainDetailContext.js";

export const UseTrainDetail = () => {
  const context = useContext(TrainDetailContext);

  if (!context)
    throw new Error("UseTrainDetail must be used within a TrainDetailProvider");

  return context;
};

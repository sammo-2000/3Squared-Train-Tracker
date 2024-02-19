import React from "react";

// Hooks
import { useFavTrain } from "../hooks/FavTrainHook.js";

const SetMarker = () => {
  const { favTrain } = useFavTrain();
  return <div>SetMarker</div>;
};

export default SetMarker;

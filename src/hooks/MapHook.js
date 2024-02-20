import { useContext } from "react";
import { MapContext } from "../contexts/MapContext.js";

export const useMap = () => {
  const context = useContext(MapContext);

  if (!context)
    throw new Error("UseMapContext must be used within a MapProvider");

  return context;
};

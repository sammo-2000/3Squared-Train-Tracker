import { useContext } from "react";
import { TrackedRoutesContext } from "../contexts/TrackedRoutesContext.js";

export const UseTrackedRoutes = () => {
  const context = useContext(TrackedRoutesContext);

  if (!context)
    throw new Error(
      "UseTrackedRoutes must be used within a TrainDetailProvider"
    );

  return context;
};

export default UseTrackedRoutes;

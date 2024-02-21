import { useContext } from "react";
import { TrackedLocationsContext } from "../contexts/TrackedLocationsContext.js";

export const UseTrackedLocations = () => {
  const context = useContext(TrackedLocationsContext);

  if (!context)
    throw new Error(
      "UseTrackedLocations must be used within a TrackedLocationsProvider"
    );

  return context;
};

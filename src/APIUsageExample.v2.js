import React, { useState } from "react";

// We import loading to display loading when data is being fetched from the API
import Loading from "./components/Loading";

// Import hooks to use them globally
import { UseTrackedLocations } from "./hooks/TrackedLocationsHook";
import { UseRoutes } from "./hooks/RoutesHook";
import { UseTrackedRoutes } from "./hooks/TrackedRoutesHook";

const APIUsageExample = () => {
  const { trackedRoutes } = UseTrackedRoutes();
  const train = 0; // Just doing the 1 train for now.

  const getRoutesLocations = () => {
    const tR = trackedRoutes[train];
    const end = tR.schedule[tR.schedule.length - 1].latLong;
    const start = tR.schedule[train].latLong;
    return [start, end];
  };

  const callApi = async () => {
    const [start, end] = getRoutesLocations();
    const response = await fetch(
      `https://signal.eu.org/osm/eu/route/v1/train/${start.longitude},${start.latitude};${end.longitude},${start.latitude}?overview=false&alternatives=true&steps=true`
    );

    const data = await response.json();
    return data.routes[0].legs[0].steps; // get first route, and first leg
  };

  const filterApi = async () => {
    const steps = await callApi();

    if (Array.isArray(steps) && steps !== null) {
      const locations = steps.map((step) => step.maneuver.location);
      return locations;
    }
    return [];
  };

  const plotPoints = async () => {
    return (points = await filterApi());
  };

  return (
    <div className="flex justify-end">
      <button
        className="bg-black text-white m-5 p-5"
        onClick={() => filterApi()}
      >
        Plot routes
      </button>
    </div>
  );
};

export const giveMePlots = () => {
  console.log(APIUsageExample.plotPoints());

  //return APIUsageExample.plotPoints();
};

export default APIUsageExample;

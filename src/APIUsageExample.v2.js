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
    console.log(data);
  };

  return (
    <div className="flex justify-end">
      <button className="bg-black text-white m-5 p-5" onClick={() => callApi()}>
        Plot routes
      </button>
    </div>
  );
};

export default APIUsageExample;

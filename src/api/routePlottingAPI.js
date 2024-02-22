const getRoutesLocations = (trackedRoutes) => {
  const tR = trackedRoutes[0];
  const end = tR.schedule[tR.schedule.length - 1].latLong;
  const start = tR.schedule[0].latLong;
  return [start, end];
};

const callApi = async (startEnd) => {
  const response = await fetch(
    `https://signal.eu.org/osm/eu/route/v1/train/${startEnd[0].longitude},${startEnd[0].latitude};${startEnd[1].longitude},${startEnd[1].latitude}?overview=false&alternatives=true&steps=true`
  );

  const data = await response.json();
  return data.routes[0].legs[0].steps; // get first route, and first leg
};

const filterApi = async (steps) => {
  if (Array.isArray(steps) && steps !== null) {
    const locations = steps.map((step) => step.maneuver.location);
    return locations;
  }
  return [];
};

export const plotPoints = async (trackedRoutes) => {
  if (trackedRoutes.length !== 0) {
    const startEnd = await getRoutesLocations(trackedRoutes);
    const routesLocations = await callApi(startEnd);
    const filter = await filterApi(routesLocations);
    console.log(filter);
    return await filter;
  }
  return [];
};

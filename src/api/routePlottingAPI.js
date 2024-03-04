const getStartEnd = (route) => {
  const start = route.schedule[0].latLong;
  const end = route.schedule[route.schedule.length - 1].latLong;
  return { start, end };
};

const callApi = async (startEnd) => {
  const response = await fetch(
    `https://signal.eu.org/osm/eu/route/v1/train/${startEnd.start.longitude},${startEnd.start.latitude};${startEnd.end.longitude},${startEnd.end.latitude}?overview=false&alternatives=true&steps=true`
  );
  const data = await response.json();
  if (data.routes[0].legs[0].steps) return data.routes[0].legs[0].steps;
  return [];
};

// const filterApi = async (steps) => {
//   if (Array.isArray(steps) && steps !== null) {
//     const locations = steps.map((step) => step.maneuver.location);
//     return locations;
//   }
//   return [];
// };

export const plotPoints = async (trackedRoutes) => {
  let myTrackRoutes = [];

  for (const route of trackedRoutes) {
    // Return empty array if no schedule
    if (route.schedule.length === 0) continue;

    const startEnd = getStartEnd(route);

    const routesLocations = await callApi(startEnd);

    myTrackRoutes.push(routesLocations);
  }

  return myTrackRoutes;
};

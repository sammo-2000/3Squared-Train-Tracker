import React from "react";
import { Polyline } from "react-leaflet";

const SetRouteOnMap = (route, color) => {
  const lineOptions = {
    color: color || "blue",
    outline: "black",
    weight: 4,
    outlineStyle: "solid",
    clickable: true,
    lineJoin: "round",
    lineCap: "round",
    smoothFactor: 0,
    noClip: true,
    bubblingMouseEvents: true,
  };

  // variable to store the route
  let myRoute = [];

  // loop through the route and add the coordinates to the myRoute array
  for (let i = 0; i < route.length; i++) {
    myRoute.push([
      route[i].maneuver.location[1],
      route[i].maneuver.location[0],
    ]);
  }

  return <Polyline pathOptions={lineOptions} positions={myRoute} />;
};

export default SetRouteOnMap;

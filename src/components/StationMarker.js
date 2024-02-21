import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../assets/icons/trainStation.png";

// Hooks & Contexts
import { UseTrackedLocations } from "../hooks/TrackedLocationsHook";

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [38, 38],
});

const StationMarker = () => {
  const { trackedLocations } = UseTrackedLocations();

  return (
    <>
      {trackedLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.Latitude, location.Longitude]}
          icon={trainStationIcon}
        />
      ))}
    </>
  );
};

export default StationMarker;

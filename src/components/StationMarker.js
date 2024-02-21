import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
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
        >
            <Popup>
                <div>
                    <h1>{location.Name}</h1>
                    <p>{location.Description}</p>
                </div>
            </Popup>
        </Marker>
      ))}
    </>
  );
};

export default StationMarker;

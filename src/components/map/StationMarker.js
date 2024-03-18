import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon, CircleMarker } from "leaflet";
import stationIcon from "../../assets/icons/station.svg";

// Hooks & Contexts
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook";

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [26, 26],
  className: "outline-2 outline-red-500",
});

const StationMarker = () => {
  const { trackedLocations } = UseTrackedLocations();

  return (
    <>
      {trackedLocations.map((location) => (
        <div>
          {/* <CircleMarker
            center={[location.Latitude, location.Longitude]}
            radius={15}
            color="#4da6ff"
            fillColor="#2492ff"
            fillOpacity={1}
            stroke={true}
            weight={2}
            className="shadow-xl pulse"
          ></CircleMarker> */}
          <Marker
            key={location.id}
            position={[location.Latitude, location.Longitude]}
            icon={trainStationIcon}
          >
            <Popup>
              <div className="min-w-[250px]">
                <strong className="text-lg text-center block">
                  {location.Name}
                </strong>
                <div className="w-full h-[1px] bg-gray-400 my-1"></div>
                <div className="text-xs text-gray-500">
                  <strong>Tiploc </strong>
                  {location.Tiploc}
                </div>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </>
  );
};

export default StationMarker;

import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../../assets/icons/location-pin-outlined.png";

// Hooks & Contexts
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook";

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [26, 26],
});

const StartEndMarkers = () => {
  const { trackedRoutes } = UseTrackedRoutes();

  useEffect(() => {
    trackedRoutes.map((route) => {
      console.log(route);
    });
  }, [trackedRoutes]);

  return (
    <>
      {trackedRoutes.map((route) => (
        <>
          <Marker
            key={route.tiploc.activationId}
            position={[
              route.schedule[0].latLong.latitude,
              route.schedule[0].latLong.longitude,
            ]}
            icon={trainStationIcon}
          >
            <Popup>
              <div className="min-w-[250px]">
                <strong className="text-lg text-center block">
                  {route.tiploc.originLocation}
                </strong>
                <div className="w-full h-[1px] bg-gray-400 my-1"></div>
                <div className="text-xs text-gray-500">
                  <strong>Tiploc </strong>
                  {route.tiploc.originTiploc}
                </div>
              </div>
            </Popup>
          </Marker>
          <Marker
            key={route.tiploc.activationId}
            position={[
              route.schedule[route.schedule.length - 1].latLong.latitude,
              route.schedule[route.schedule.length - 1].latLong.longitude,
            ]}
            icon={trainStationIcon}
          >
            <Popup>
              <div className="min-w-[250px]">
                <strong className="text-lg text-center block">
                  {route.tiploc.destinationLocation}
                </strong>
                <div className="w-full h-[1px] bg-gray-400 my-1"></div>
                <div className="text-xs text-gray-500">
                  <strong>Tiploc </strong>
                  {route.tiploc.destinationTiploc}
                </div>
              </div>
            </Popup>
          </Marker>
        </>
      ))}
    </>
  );
};

export default StartEndMarkers;
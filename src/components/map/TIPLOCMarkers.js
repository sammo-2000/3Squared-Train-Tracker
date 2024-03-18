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

const StartMarker = () => {
  const { trackedRoutes } = UseTrackedRoutes();

  return (
    <>
      {trackedRoutes.map((route) =>
        route.schedule.map((schedule) => (
          <>
            {/* {console.log(schedule)} */}
            <Marker
              key={route.tiploc.activationId + "_" + schedule.pass}
              position={[schedule.latLong.latitude, schedule.latLong.longitude]}
              icon={trainStationIcon}
            >
              <Popup>
                <div className="min-w-[250px]">
                  <strong className="text-lg text-center block">
                    {schedule.location}
                  </strong>
                  <div className="w-full h-[1px] bg-gray-400 my-1"></div>
                  <div className="text-xs text-gray-500">
                    <strong>Tiploc </strong>
                    {schedule.tiploc}
                  </div>
                </div>
              </Popup>
            </Marker>
          </>
        ))
      )}
    </>
  );
};

export default StartMarker;

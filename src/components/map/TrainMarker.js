import React, { useEffect, useState } from "react";
import { Marker, Popup, CircleMarker } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../../assets/icons/train.jpg";
import "../../css/leaflet.css";

// Hooks & Contexts
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook";

const moment = require("moment");

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [10, 67],
});

const TrainMarker = () => {
  const { trackedRoutes } = UseTrackedRoutes();
  const [trainLocations, setTrainLocations] = useState([]);

  useEffect(() => {
    const updatedTrainLocations = [];

    trackedRoutes.forEach((element) => {
      // Check if the train is cancelled or has no movement reports
      if (element.tiploc.cancelled || element.movment.length === 0) return;

      const lastMovement = element.movment[element.movment.length - 1];
      // Add the last reported location to the state
      updatedTrainLocations.push({
        id: element.tiploc.activationId,
        position: [
          lastMovement.latLong.latitude,
          lastMovement.latLong.longitude,
        ],
        toc_Name: element.tiploc.toc_Name,
        activationId: element.tiploc.activationId,
        originLocation: element.tiploc.originLocation,
        destinationLocation: element.tiploc.destinationLocation,
        lastReported: element.tiploc.lastReported,
        lastReportedType: element.tiploc.lastReportedType,
      });
    });

    setTrainLocations(updatedTrainLocations);
  }, [trackedRoutes]);

  return (
    <>
      {trainLocations.map((train) => (
        <div>
          <CircleMarker
            center={train.position}
            pathOptions={{ color: "blue" }}
            radius={18}
          >
            <Popup>zoom</Popup>
          </CircleMarker>
          <Marker
            key={train.id + train.toc_Name}
            position={train.position}
            icon={trainStationIcon}
            riseOnHover={true}
          >
            <Popup closeButton={false}>
              <div className="min-w-[250px]">
                <strong className="text-lg text-center block">
                  {train.originLocation} - {train.destinationLocation}
                </strong>
                <div className="w-full h-[1px] bg-gray-400 my-1"></div>
                <div className="text-xs text-gray-500">
                  <strong>Activation ID </strong>
                  {train.activationId}
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <span>{train.lastReportedType}</span>
                  </div>
                  <div className="font-mono">
                    {moment(train.lastReported).format("h:mm A")}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </>
  );
};

export default TrainMarker;

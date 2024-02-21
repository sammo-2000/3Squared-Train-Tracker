import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../assets/icons/close.svg";
import "../css/leaflet.css";

// Hooks & Contexts
import { UseTrackedRoutes } from "../hooks/TrackedRoutesHook";

const moment = require("moment");

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [38, 38],
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
        activationId: element.tiploc.activationId,
        originLocation: element.tiploc.originLocation,
        destinationLocation: element.tiploc.destinationLocation,
        lastReported: element.tiploc.lastReported,
      });
    });

    setTrainLocations(updatedTrainLocations);
  }, [trackedRoutes]);

  return (
    <>
      {trainLocations.map((train) => (
        <Marker
          key={train.id}
          position={train.position}
          icon={trainStationIcon}
        >
          <Popup closeButton={false}>
            <div className="flex flex-col gap-2">
              <div>
                <strong>Activation ID </strong>
                {train.activationId}
              </div>
              <div>
                <strong>Origin </strong>
                {train.originLocation}
              </div>
              <div>
                <strong>Destination </strong>
                {train.destinationLocation}
              </div>
              <div>
                <strong>Last Report </strong>
                {moment(train.lastReported).format("h:mm A")}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default TrainMarker;

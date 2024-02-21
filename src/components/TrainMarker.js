import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../assets/icons/train.svg";

// Hooks & Contexts
import { UseTrackedRoutes } from "../hooks/TrackedRoutesHook";

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [38, 38],
});

const TrainMarker = () => {
  const { trainDetail } = UseTrackedRoutes();
  const [trainLocations, setTrainLocations] = useState([]);

  useEffect(() => {
    const updatedTrainLocations = [];

    trainDetail.forEach((element) => {
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
      });
    });

    setTrainLocations(updatedTrainLocations);
  }, [trainDetail]);

  return (
    <>
      {trainLocations.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          icon={trainStationIcon}
        />
      ))}
    </>
  );
};

export default TrainMarker;

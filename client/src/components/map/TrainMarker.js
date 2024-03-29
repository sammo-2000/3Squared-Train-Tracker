import React, { useEffect, useState } from "react";
import { Marker, Popup, CircleMarker } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../../assets/icons/train.svg";
import "../../css/leaflet.css";
import { Slider, Tag } from "antd";

// Hooks & Contexts
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook";

const moment = require("moment");

const trainStationIcon = new Icon({
  iconUrl: stationIcon,
  iconSize: [10, 67],
  style: { color: "red" },
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
      });
    });

    setTrainLocations(updatedTrainLocations);
  }, [trackedRoutes]);

  return (
    <>
      {trainLocations.map((train, index) => (
        <div>
          <CircleMarker
            key={index}
            center={train.position}
            radius={15}
            color="#4da6ff"
            fillColor="#2492ff"
            fillOpacity={1}
            stroke={true}
            weight={2}
            className="shadow-xl pulse"
          ></CircleMarker>
          <Marker
            key={train.id + train.toc_Name}
            position={train.position}
            icon={trainStationIcon}
            riseOnHover={true}
          >
            <Popup closeButton={false}>
              {SetTrainDetails(trackedRoutes[index])}
            </Popup>
          </Marker>
        </div>
      ))}
    </>
  );
};

const SetTrainDetails = (route) => {
  try {
    let expectedDeparture = null;
    let actualDeparture = null;
    let isLate = false;
    let timeDifferent = null;

    expectedDeparture = new Date(route.tiploc.scheduledDeparture) || null;
    actualDeparture = route.movment[0]
      ? new Date(route.movment[0].actual)
      : null;
    isLate = actualDeparture - expectedDeparture > 0 ? "Yes" : "No";
    timeDifferent =
      moment(actualDeparture).diff(moment(expectedDeparture), "minutes") || 0;

    const minValue = 0;
    let currentValue = 0;
    const maxValue = route.schedule.length;

    route.schedule.forEach((mySchedule) => {
      route.movment.forEach((myMovement) => {
        if (mySchedule.tiploc === myMovement.tiploc) {
          currentValue++;
        }
      });
    });
    return (
      <div className="min-w-[250px]">
        <strong className="text-lg text-center block">
          {route.tiploc.originLocation} - {route.tiploc.destinationLocation}
        </strong>
        <div className="w-full h-[1px] bg-gray-400 my-1"></div>
        <div className="flex flex-col gap-1">
          <span className="text-xl">Train Details</span>
          {/* trainId, tocName, headCode,  */}
          <span>
            Train ID: <Tag>{route.tiploc.trainId}</Tag>
          </span>
          <span>
            Head Code: <Tag>{route.tiploc.headCode}</Tag>
          </span>
          <span>
            TOC Name: <Tag>{route.tiploc.toc_Name}</Tag>
          </span>
        </div>
        {route.movment[0] && (
          <div className="flex flex-col gap-1">
            <span className="text-xl">Actual</span>
            {/* arrival, departure */}
            <span>
              Actual Departure: <Tag>{EasyTime(route.movment[0].actual)}</Tag>
            </span>
            <span>
              Expected Arrival:{" "}
              <Tag>
                {" "}
                {EasyTime(
                  moment(route.movment[0].actual).add(
                    moment.duration(
                      moment(route.tiploc.scheduledArrival) -
                        moment(route.tiploc.scheduledDeparture)
                    )
                  )
                )}
              </Tag>
            </span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xl">Planned</span>
          {/* arrival, departure */}
          <span>
            Schedule Departure:{" "}
            <Tag>{EasyTime(route.tiploc.scheduledDeparture)}</Tag>
          </span>
          <span>
            Schedule Arrival:{" "}
            <Tag>{EasyTime(route.tiploc.scheduledArrival)}</Tag>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl">Status</span>
          {/* isLate, lateAmount */}
          <span>
            Late: <Tag color={isLate === "Yes" ? "red" : "green"}>{isLate}</Tag>
          </span>
          <span>
            Time Different:{" "}
            <span>
              <Tag color={isLate === "Yes" ? "red" : "green"}>
                {timeDifferent === 0
                  ? "On Time"
                  : isLate === "Yes"
                  ? `${Math.abs(timeDifferent)} mintues late`
                  : `${Math.abs(timeDifferent)} mintues early`}
              </Tag>
            </span>
          </span>
          <span>
            <Slider
              defaultValue={30}
              disabled={true}
              value={currentValue}
              max={maxValue}
              min={minValue}
            />
          </span>
          <span className="text-xs text-gray-500">
            The time shown above is not current time, it is time different when
            train took off and expected timer
            <br />
            The slider feature is currently in its experimental stage and may
            not always function reliably.
          </span>
        </div>
      </div>
    );
  } catch (error) {
    return error.message;
  }
};

const EasyTime = (time) => moment(time).format("h:mm A") || "N/A";

export default TrainMarker;

import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../../assets/icons/location-pin-outlined.png";
// import moment from "moment";

// Hooks & Contexts
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook";
import moment from "moment";

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
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">Train Details</span>
                    <span>Train ID: {route.tiploc.trainId}</span>
                    <span>Origin Location: {route.tiploc.originLocation}</span>
                    <span>
                      Destination Location: {route.tiploc.destinationLocation}
                    </span>
                    {TrainDetailTimer({ route: route, schedule })}
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

const TrainDetailTimer = ({ route, schedule }) => {
  let passingByOnly = schedule.pass ? "Yes" : "No";
  let expectedPass = schedule.pass || null;
  let expectedDeparture = null;
  let expectedArrival = null;
  let actualArrival = null;
  let actualDeparture = null;
  let isPass = false;
  let isLate = false;
  let timeDifferent = null;

  route.movment.map((movment) => {
    if (movment.tiploc === schedule.tiploc) {
      expectedArrival = movment.plannedArrival || null;
      expectedDeparture = new Date(movment.plannedDeparture) || null;
      actualArrival = movment.actualArrival || null;
      actualDeparture = new Date(movment.actualDeparture) || null;
      isPass = actualArrival && actualDeparture ? "Yes" : "No";
      isLate = actualDeparture - expectedDeparture > 0 ? "Yes" : "No";
      timeDifferent =
        moment(actualDeparture).diff(moment(expectedDeparture), "minutes") ||
        "0";
    }
  });

  return (
    <div className="flex flex-col gap-1">
      {/* Show Planned Details */}
      <span className="text-xl">Planned</span>
      <span>Just Passing By: {passingByOnly}</span>
      {expectedPass && <span>Expected Pass: {expectedPass}</span>}
      {expectedArrival && (
        <span>Expected Arrival: {EasyTime(expectedArrival)}</span>
      )}
      {expectedDeparture && (
        <span>Expected Departure: {EasyTime(expectedDeparture)}</span>
      )}

      {/* Show Acutal Time */}
      {actualArrival || actualDeparture ? (
        <span className="text-xl">Actual</span>
      ) : null}
      {actualArrival && <span>Actual Arrival: {EasyTime(actualArrival)}</span>}
      {actualDeparture && (
        <span>Actual Departure: {EasyTime(actualDeparture)}</span>
      )}

      {/* Show Status */}
      {isPass || isLate || timeDifferent ? (
        <span className="text-xl">Status</span>
      ) : null}
      {isPass && <span>Passed: {isPass}</span>}
      {isLate && <span>Late: {isLate}</span>}
      {timeDifferent && (
        <span>
          Time Different:{" "}
          <span
            className={isLate === "Yes" ? "text-red-500" : "text-green-500"}
          >
            {timeDifferent == 0
              ? "On Time"
              : isLate === "Yes"
              ? `${Math.abs(timeDifferent)} mintues late`
              : `${Math.abs(timeDifferent)} mintues early`}
          </span>
        </span>
      )}
    </div>
  );
};

const EasyTime = (time) => moment(time).format("h:mm A") || "N/A";

export default StartMarker;

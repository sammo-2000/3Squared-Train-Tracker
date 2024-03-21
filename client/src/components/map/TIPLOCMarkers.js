import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import stationIcon from "../../assets/icons/location-pin-outlined.png";
import { Tag } from "antd";
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
  try {
    return (
      <>
        {trackedRoutes.map((route, index) =>
          route.schedule.map((schedule) => (
            <>
              <Marker
                key={
                  route.tiploc.activationId + "_" + schedule.pass + "_" + index
                }
                position={[
                  schedule.latLong ? schedule.latLong.latitude : 0,
                  schedule.latLong ? schedule.latLong.longitude : 0,
                ]}
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
                      <span>
                        Train ID: <Tag>{route.tiploc.trainId}</Tag>
                      </span>
                      <span>
                        Origin Location:{" "}
                        <Tag>{route.tiploc.originLocation}</Tag>
                      </span>
                      <span>
                        Destination Location:{" "}
                        <Tag>{route.tiploc.destinationLocation}</Tag>
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
  } catch (err) {
    console.log(err);
  }
};

const TrainDetailTimer = ({ route, schedule }) => {
  let passingByOnly = schedule.pass ? "Yes" : "No";
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
    return null;
  });

  return (
    <div className="flex flex-col gap-1">
      {/* Show Planned Details */}
      <span className="text-xl">Planned</span>
      <span>
        Just Passing By: <Tag>{passingByOnly}</Tag>
      </span>
      {expectedArrival && (
        <span>
          Expected Arrival: <Tag>{EasyTime(expectedArrival)}</Tag>
        </span>
      )}
      {expectedDeparture && EasyTime(expectedDeparture) !== "Invalid date" && (
        <span>
          Expected Departure: <Tag>{EasyTime(expectedDeparture)}</Tag>
        </span>
      )}

      {/* Show Acutal Time */}
      {actualArrival || actualDeparture ? (
        <span className="text-xl">Actual</span>
      ) : null}
      {actualArrival && (
        <span>
          Actual Arrival: <Tag>{EasyTime(actualArrival)}</Tag>
        </span>
      )}
      {actualDeparture && EasyTime(actualDeparture) !== "Invalid date" && (
        <span>
          Actual Departure: <Tag>{EasyTime(actualDeparture)}</Tag>
        </span>
      )}

      {/* Show Status */}
      {isPass || isLate || timeDifferent ? (
        <span className="text-xl">Status</span>
      ) : null}
      {isPass && (
        <span>
          Passed: <Tag>{isPass}</Tag>
        </span>
      )}
      {isLate && (
        <span>
          Late: <Tag color={isLate === "Yes" ? "red" : "green"}>{isLate}</Tag>
        </span>
      )}
      {timeDifferent && (
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
      )}
    </div>
  );
};

const EasyTime = (time) => moment(time).format("h:mm A") || "N/A";

export default StartMarker;

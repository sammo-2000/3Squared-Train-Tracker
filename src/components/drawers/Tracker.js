// ------------------- External Libraries -------------------
import React, { useState, useEffect } from "react";
import { Drawer, Steps, Select } from "antd";
import moment from "moment";

// ------------------- Style Utilities -------------------
import "../../css/steps.css";

// ------------------- Custom Hooks -------------------
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";

// ------------------- CSS Styles -------------------
import "../../css/drawer.css";

// ------------------- Icons -------------------
import Icon from "../Icons.js";

const { Option } = Select;

const Tracker = (props, selectedItem, isTrackerOpen, setIsTrackerOpen) => {
  // ------------------- useState -------------------
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  // Routes
  const [selectedOption, setSelectedOption] = useState(null);

  // Track Routes
  const [trackedSearchText, setTrackedSearchText] = useState("");
  const [trackedSearchedRoutes, setTrackedSearchedRoutes] = useState([]);

  // ------------------- Custom Hooks -------------------
  const { trackedRoutes } = UseTrackedRoutes();
  const [trainLocations, setTrainLocations] = useState([]);

  // ------------------- Functions -------------------

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
        {actualArrival && (
          <span>Actual Arrival: {EasyTime(actualArrival)}</span>
        )}
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

  const TrainDetailTimerPassed = ({ route, schedule }) => {
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
        {/* Show Acutal Time */}
        {actualArrival || actualDeparture ? (
          <span className="text-xl">Actual</span>
        ) : null}
        {actualArrival && (
          <span>Actual Arrival: {EasyTime(actualArrival)}</span>
        )}
        {actualDeparture && (
          <span>Actual Departure: {EasyTime(actualDeparture)}</span>
        )}

        {/* Show Status */}
        {isPass || isLate || timeDifferent ? (
          <span className="text-xl">Status</span>
        ) : (
          <span className="text-x1">No information could be found...</span>
        )}
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

  // ------------------- useEffects -------------------
  useEffect(() => {
    console.log("Selected Option", selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    const updatedTrainLocations = [];

    setTrainLocations(updatedTrainLocations);
  }, [trackedRoutes]);

  // ------------------- Local Variables -------------------
  const placement = "left";
  const closeIcon = <Icon iconName="close" />;
  const drawerStyle = { padding: 0 };

  let lastReportedTiploc;
  if (
    selectedOption &&
    selectedOption.movment &&
    selectedOption.movment.length > 0
  ) {
    lastReportedTiploc =
      selectedOption.movment[selectedOption.movment.length - 1];
  }

  let lastReportedTiplocIndex;
  if (
    selectedOption &&
    selectedOption.movment &&
    selectedOption.movment.length > 0
  ) {
    lastReportedTiploc =
      selectedOption.movment[selectedOption.movment.length - 1];
    lastReportedTiplocIndex = selectedOption.movment.findIndex(
      (movment) => movment === lastReportedTiploc
    );
  }

  return (
    <>
      {/* First menu drawer */}
      <Drawer
        // onClose={() => {
        //   props.setActiveDraw("menu");
        //   setSelectedOption(undefined);
        // }}
        title="Route Tracker"
        onClose={() => setIsTrackerOpen(false)}
        closeIcon={closeIcon}
        bodyStyle={drawerStyle}
        visible={isTrackerOpen}
        placement={placement}
      >
        {/* Dropdown for tracked routes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <p className="text-center font-bold mb-1">Available Routes</p>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a tracked route"
            optionFilterProp="children"
            onChange={(value) => {
              const selectedRoute = trackedRoutes.find(
                (route) =>
                  route.tiploc.originTiploc +
                    "-" +
                    route.tiploc.destinationTiploc ===
                  value
              );
              setSelectedOption(selectedRoute);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {trackedRoutes.map((route, index) => (
              <Option
                key={index}
                value={
                  route.tiploc.originTiploc +
                  "-" +
                  route.tiploc.destinationTiploc
                }
              >
                {index +
                  1 +
                  ". " +
                  route.tiploc.originTiploc +
                  "-" +
                  route.tiploc.destinationTiploc}
              </Option>
            ))}
          </Select>
        </div>

        {/* Route Tracker */}
        {selectedOption ? (
          <Steps
            direction="vertical"
            current={lastReportedTiplocIndex || 0}
            className="custom-dot-size custom-step-distance"
          >
            {selectedOption.schedule.map((scheduleItem, index) => {
              return (
                <Steps.Step
                  key={index}
                  title={scheduleItem.location}
                  description={
                    index < lastReportedTiplocIndex
                      ? TrainDetailTimerPassed({
                          route: selectedOption,
                          schedule: scheduleItem,
                        })
                      : TrainDetailTimer({
                          route: selectedOption,
                          schedule: scheduleItem,
                        })
                  }
                />
              );
            })}
          </Steps>
        ) : (
          <p className="text-center mt-2 text-gray-400">
            Please select a route to view its steps.
          </p>
        )}
      </Drawer>
    </>
  );
};

export default Tracker;

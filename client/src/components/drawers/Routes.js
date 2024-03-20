// ------------------- External Libraries -------------------
import React, { useState, useEffect } from "react";
import { Drawer, Space, Button, List, Steps, Select, Menu } from "antd";
import moment from "moment";

// ------------------- Internal Components -------------------
import MyInput from "./routes/Input.js";
import MyPopupConfirm from "./routes/PopupConfirm.js";
import MyOptionsConfirm from "./routes/optionsConfirm.js";
import MyListItem from "./routes/ListItem.js";
import Search from "./routes/SearchFunction.js";

// ------------------- Style Utilities -------------------
import { getBackgroundColor, getHoverStyles } from "./routes/ListItemStyle.js";

// ------------------- Custom Hooks -------------------
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";
import { UseRoutes } from "../../hooks/RoutesHook.js";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook.js";

// ------------------- API Functions -------------------
import { tiplocAPI } from "../../api/tiplocAPI.js";
import { detailAPI } from "../../api/detailAPI.js";

// ------------------- CSS Styles -------------------
import "../../css/drawer.css";
import "../../css/steps.css";

// ------------------- Icons -------------------
import Icon from "../Icons.js";

// ------------------- Cookies -------------------
import Cookies from "js-cookie";

const { Option } = Select;

const Routes = (props) => {
  // ------------------- useState -------------------
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  // Routes
  const [searchText, setSearchText] = useState("");
  const [searchedRoutes, setSearchedRoutes] = useState([]);
  // Track Routes
  const [trackedSearchText, setTrackedSearchText] = useState("");
  const [trackedSearchedRoutes, setTrackedSearchedRoutes] = useState([]);

  // Tracker
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedValue, setSelectedValue] = useState();

  // Routes
  const [selectedOption, setSelectedOption] = useState(null);

  // ------------------- Custom Hooks -------------------
  const { trackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();
  const [trainLocations, setTrainLocations] = useState([]);

  // ------------------- Functions -------------------
  // Stop tracking a route
  const stopTracking = async (item) => {
    localStorage.clear();
    let _trackedRoutes = [...trackedRoutes];
    const _itemToRemove = item;
    _trackedRoutes = _trackedRoutes.filter((route) => route !== _itemToRemove);
    await setTrackedRoutes(_trackedRoutes);
  };

  const viewTracker = async (item) => {
    setSelectedOption(item);
    setIsTrackerOpen(true); // Open the Tracker Drawer
  };

  // Start tracking a route
  const startTracking = async (item) => {
    localStorage.clear();
    let _trackedRoutes = [...trackedRoutes];
    const _newData = await detailAPI([item]);
    _trackedRoutes = [..._trackedRoutes, ..._newData];
    await setTrackedRoutes(_trackedRoutes);
  };

  // Open and close second drawer
  const openCloseChildrenDrawer = () => setChildrenDrawer(!childrenDrawer);

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
    const updatedTrainLocations = [];
    setTrainLocations(updatedTrainLocations);
  }, [trackedRoutes]);

  // Search filter for routes
  useEffect(() => {
    setSearchedRoutes(Search(searchText, routes, false));
  }, [searchText]);

  // Open child drawer when cookie is set to true
  useEffect(
    () => {
      const location = Cookies.get("openDrawer");
      if (!location) return;
      Cookies.remove("openDrawer");
      setChildrenDrawer(true);
      setSearchText("from:" + location.toString().toLocaleLowerCase());
    },
    [Cookies.get("openDrawer")],
    setSearchText
  );

  // Search filter for tracked routes
  useEffect(() => {
    setTrackedSearchedRoutes(Search(trackedSearchText, trackedRoutes, true));
  }, [trackedSearchText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // All routes information from the API
        const _routes = await tiplocAPI(trackedLocations);

        // Exit if not array
        if (!Array.isArray(_routes)) return;

        // Keep track of tracked routes ID & operators
        let _trackedRoutes = [];
        trackedRoutes.forEach((__trackedRoute) => {
          _trackedRoutes.push({
            ID: __trackedRoute.tiploc.activationId,
            operator: __trackedRoute.tiploc.toc_Name,
          });
        });

        // Filter routes to only include those that are not already tracked
        const _filteredRoutes = _routes.filter(
          (route) =>
            !_trackedRoutes.some(
              (trackedRoute) =>
                trackedRoute.ID === route.activationId &&
                trackedRoute.operator === route.toc_Name
            )
        );

        // Set the routes to the filtered routes
        setRoutes(_filteredRoutes.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [trackedLocations, trackedRoutes]);

  // ------------------- Local Variables -------------------
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

  const onTrackedRouteClick = async (item, e) => {
    if (e.key === "view-details") {
      await viewTracker(item);
    }

    if (e.key === "stop-tracking") {
      await stopTracking(item);
    }
  };

  return (
    <>
      {/* First menu drawer */}
      <Drawer
        title="Tracked Routes"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={props.isOpen}
        placement={"left"}
        closeIcon={<Icon iconName="back" />}
        bodyStyle={{ padding: 0 }}
        extra={
          <Space>
            <Button
              onClick={openCloseChildrenDrawer}
              shape="circle"
              type="primary"
              ghost
              icon={<Icon iconName="add" />}
            ></Button>
          </Space>
        }
      >
        {/* Search box on first menu */}
        <MyInput
          value={trackedSearchText || ""}
          onChange={(e) => setTrackedSearchText(e.target.value)}
        />

        {/* List routes on first menu */}
        <List
          size="large"
          dataSource={trackedSearchedRoutes || trackedRoutes}
          style={{ size: "200px" }}
          renderItem={(item) => (
            <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
              <Menu
                onClick={(e) => onTrackedRouteClick(item, e)}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  borderRight: "none",
                  margin: "0px",
                  padding: "0px",
                }}
                defaultSelectedKeys={[]}
                mode="vertical"
                selectable={false}
                items={[
                  {
                    key: item.Tiploc,
                    label: (
                      <>
                        <p className="text-blue-400 text-sm">
                          {item.tiploc.headCode}
                        </p>
                        <p className="text-blue-600 text-sm">
                          {item.tiploc.toc_Name}
                        </p>
                        <p className="font-bold text-lg my-2">
                          {item.tiploc.originLocation} -{" "}
                          {item.tiploc.destinationLocation}
                        </p>
                        <p className="text-gray-500">
                          {item.tiploc.lastReportedType}
                        </p>
                      </>
                    ),
                    defaultSelectedKeys: [],
                    children: [
                      {
                        key: "view-details",
                        label: "View details",
                        onClick: null,
                      },
                      {
                        key: "stop-tracking",
                        label: "Stop tracking",
                        onClick: null,
                      },
                    ],
                  },
                ]}
              />
            </List.Item>
          )}
        />
        {/* Route Tracker drawer */}
        <Drawer
          title="Tracker"
          closable={true}
          closeIcon={<Icon iconName="close" />}
          placement="left"
          bodyStyle={{ padding: 0 }}
          visible={isTrackerOpen}
          onClose={() => setIsTrackerOpen(false)}
        >
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
        {/* Second menu drawer */}
        <Drawer
          title="Track New Route"
          closable={true}
          onClose={openCloseChildrenDrawer}
          open={childrenDrawer}
          placement={"left"}
          closeIcon={<Icon iconName="close" />}
          bodyStyle={{ padding: 0 }}
        >
          {/* Search box on second menu */}
          <MyInput
            value={searchText || ""}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {routes && routes.length > 0 && (
            <List
              size="large"
              dataSource={searchedRoutes || routes}
              style={{ size: "200px" }}
              renderItem={(item) => (
                <MyPopupConfirm
                  title="Track Route"
                  description="Are you sure you want to track this route?"
                  onConfirm={async () => {
                    await startTracking(item);
                  }}
                >
                  <List.Item
                    className={`${getHoverStyles()} ${getBackgroundColor(
                      item.lastReportedType
                    )}`}
                  >
                    <MyListItem item={item} />
                  </List.Item>
                </MyPopupConfirm>
              )}
            />
          )}
        </Drawer>
      </Drawer>
    </>
  );
};

export default Routes;

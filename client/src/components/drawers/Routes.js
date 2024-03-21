// ------------------- External Libraries -------------------
import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Space,
  Button,
  List,
  Steps,
  Select,
  Menu,
  Input,
  Badge,
  Tabs,
  Tag,
} from "antd";
import moment from "moment";

// ------------------- Internal Components -------------------
import MyInput from "./routes/Input.js";
import MyPopupConfirm from "./routes/PopupConfirm.js";
import MyOptionsConfirm from "./routes/optionsConfirm.js";
import MyListItem from "./routes/ListItem.js";
import Filter from "../modals/Filter.js";

// ------------------- Style Utilities -------------------
import { getBackgroundColor, getHoverStyles } from "./routes/ListItemStyle.js";

// ------------------- Custom Hooks -------------------
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";
import { UseRoutes } from "../../hooks/RoutesHook.js";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook.js";
import { useFilter } from "../../hooks/FilterHook";
import { useSettings } from "../../hooks/SettingsHook";

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
  const [searchedRoutes, setSearchedRoutes] = useState([]);

  // Track Routes
  const [trackedSearchedRoutes, setTrackedSearchedRoutes] = useState([]);

  // Tracker
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedValue, setSelectedValue] = useState();

  // Routes
  const [selectedOption, setSelectedOption] = useState(null);

  // Filter
  const [searchText, setSearchText] = useState("");
  const [searchFilterModal, setSearchFilterModal] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  // ------------------- Custom Hooks -------------------
  const { trackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();
  const [trainLocations, setTrainLocations] = useState([]);
  const { filter, setFilter } = useFilter();
  const { settings, setSettings } = useSettings();

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
    if (settings.menuAutoClose.value === true) {
      setChildrenDrawer(false);
    }

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

  // Filtering
  const displayDot = () => {
    let showDot = false;

    // Last Reported Type && Off Route

    showDot =
      filter.selected.routes.lastReportedType.length !==
        filter.options.routes.lastReportedType.length ||
      filter.selected.routes.offRoute.key !==
        filter.options.routes.offRoute[0].key;

    // Train and Schedule options
    ["train", "schedule"].map((type) => {
      Object.entries(filter.selected.routes[type]).forEach(([key, value]) => {
        if (
          JSON.stringify(filter.options.routes[type][key][0]) !==
          JSON.stringify(filter.selected.routes[type][key])
        ) {
          showDot = true;
        }
      });
    });

    return showDot;
  };

  const sortRoutes = (alpha, beta) => {
    let a = alpha;
    let b = beta;

    if (a.hasOwnProperty("tiploc")) {
      a = a.tiploc;
    }

    if (b.hasOwnProperty("tiploc")) {
      b = b.tiploc;
    }

    const aMatches = Array.from(a.originLocation.toLowerCase()).filter((char) =>
      searchText.toLowerCase().includes(char)
    ).length;
    const bMatches = Array.from(b.originLocation.toLowerCase()).filter((char) =>
      searchText.toLowerCase().includes(char)
    ).length;

    const aLengthDifference = Math.abs(
      a.originLocation.length - searchText.length
    );
    const bLengthDifference = Math.abs(
      b.originLocation.length - searchText.length
    );

    const aScore = aMatches - aLengthDifference;
    const bScore = bMatches - bLengthDifference;

    return bScore - aScore; // sort in descending order of score
  };

  const filterRoute = (r) => {
    let route = r;

    if (route.hasOwnProperty("tiploc")) {
      route = route.tiploc;
    }

    let advancedSearch = false;
    let advancedFilter = false;

    // Array of allowed terms
    const allowedTerms = [
      "id",
      "toc",
      "headcode",
      "to",
      "totiploc",
      "from",
      "fromtiploc",
    ];

    const chosenTerm = {
      id: "trainId",
      toc: "toc_Name",
      headcode: "headCode",
      to: "destinationLocation",
      totiploc: "destinationTiploc",
      from: "originLocation",
      fromtiploc: "originTiploc",
    };

    if (searchText.includes(":")) {
      advancedSearch = true;

      const searchedSplit = searchText.split(":");
      const searchedTerm = searchedSplit[0].trim().toLowerCase();
      const searchedValue =
        searchedSplit.length > 1 ? searchedSplit[1].trim() : true;

      if (!allowedTerms.includes(searchedTerm)) return true;

      if (!searchedTerm || !searchedValue) return true;

      advancedFilter = route[chosenTerm[searchedTerm]]
        .toLowerCase()
        .includes(searchedValue.toLowerCase());
    }

    const propertiesToCheck = [
      "originTiploc",
      "destinationTiploc",
      "destinationLocation",
      "originLocation",
      "headCode",
      "toc_Name",
      "trainId",
      "lastReportedType",
    ];

    if (advancedSearch === true) {
      return advancedFilter;
    }

    return propertiesToCheck.some((property) => {
      if (route.hasOwnProperty(property)) {
        route[property].toLowerCase().includes(searchText.toLowerCase());
      } else {
        // console.log(route);
        // console.log(property);
        return true;
      }
    });
  };

  const routeFilter = (r) => {
    let route = r;

    if (route.hasOwnProperty("tiploc")) {
      route = route.tiploc;
    }

    // lastReportedType
    if (route.hasOwnProperty("lastReportedType")) {
      if (
        !filter.selected.routes.lastReportedType
          .map((i) => {
            if (i.hasOwnProperty("value")) {
              return i.value;
            } else {
              return i;
            }
          })
          .includes(route.lastReportedType)
      ) {
        return false;
      }
    }

    // offRoute
    if (
      route.hasOwnProperty("offRoute") &&
      filter.selected.routes.offRoute.value !== null
    ) {
      return filter.selected.routes.offRoute.value === route.offRoute;
    }

    // Train: cancelled

    if (
      route.hasOwnProperty("cancelled") &&
      filter.selected.routes.train.cancelled.value !== null
    ) {
      return filter.selected.routes.train.cancelled.value === route.cancelled;
    }

    // Train: cancelledEnRoute
    if (
      route.hasOwnProperty("cancelledEnRoute") &&
      filter.selected.routes.train.cancelledEnRoutes.value !== null
    ) {
      return (
        filter.selected.routes.train.cancelledEnRoutes.value ===
        route.cancelledEnRoute
      );
    }

    // Train: cancelledImmediatly (actual spelling)

    if (
      route.hasOwnProperty("cancelledImmediatly") &&
      filter.selected.routes.train.cancelledImmediately.value !== null
    ) {
      return (
        filter.selected.routes.train.cancelledImmediately.value ===
        route.cancelledImmediatly
      );
    }

    // Train: cancelledOutOfPlan

    if (
      route.hasOwnProperty("cancelledOutOfPlan") &&
      filter.selected.routes.train.cancelledOutOfPlan.value !== null
    ) {
      return (
        filter.selected.routes.train.cancelledOutOfPlan.value ===
        route.cancelledOutOfPlan
      );
    }

    // Train: shouldHaveDepartedException

    if (
      route.hasOwnProperty("shouldHaveDepartedException") &&
      filter.selected.routes.train.shouldHaveDepartedException.value !== null
    ) {
      return (
        filter.selected.routes.train.shouldHaveDepartedException.value ===
        route.shouldHaveDepartedException
      );
    }

    // Schedule: hasSchedule

    if (
      route.hasOwnProperty("hasSchedule") &&
      filter.selected.routes.schedule.hasSchedule.value !== null
    ) {
      return (
        filter.selected.routes.schedule.hasSchedule.value === route.hasSchedule
      );
    }

    // Schedule: scheduleCancelled

    if (
      route.hasOwnProperty("scheduleCancelled") &&
      filter.selected.routes.schedule.scheduleCancelled.value !== null
    ) {
      return (
        filter.selected.routes.schedule.scheduleCancelled.value ===
        route.scheduleCancelled
      );
    }

    // Schedule: scheduleJustForToday

    if (
      route.hasOwnProperty("scheduleJustForToday") &&
      filter.selected.routes.schedule.scheduleJustForToday.value !== null
    ) {
      return (
        filter.selected.routes.schedule.scheduleJustForToday.value ===
        route.scheduleJustForToday
      );
    }

    return true;
  };

  const filteredRoutes = routes
    .filter((route) => filterRoute(route))
    .sort((a, b) => sortRoutes(a, b))
    .filter((route) => routeFilter(route));

  const filteredTrackedRoutes = trackedRoutes
    .filter((route) => filterRoute(route))
    .sort((a, b) => sortRoutes(a, b))
    .filter((route) => routeFilter(route));

  return (
    <>
      {/* First menu drawer */}
      <Drawer
        title="Tracked Routes"
        onClose={() => {
          setSearchText("");
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
        {!childrenDrawer && (
          <Filter
            isOpen={searchFilterModal}
            setOpen={setSearchFilterModal}
            defaultKey="2"
          />
        )}
        {/* Search box on first menu */}
        <Input
          placeholder={`Search ${trackedRoutes.length.toLocaleString()} Tracked Routes`}
          allowClear
          size="large"
          prefix={<Icon className="px-1" iconName="search" />}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            marginTop: "-1px",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "0",
            padding: "1rem 1rem",
          }}
          value={searchText}
          suffix={
            <Button
              onClick={() =>
                setSearchFilterModal(searchFilterModal ? false : true)
              }
              type="text"
              className="px-1"
            >
              <Badge status="processing" dot={displayDot()}>
                <Icon iconName="filter" />
              </Badge>
            </Button>
          }
        />

        {/* List routes on first menu */}
        <List
          size="large"
          dataSource={filteredTrackedRoutes}
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
                        label: "View Journey",
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
          title="Route Tracking"
          closable={true}
          closeIcon={<Icon iconName="close" />}
          placement="left"
          bodyStyle={{ padding: 0 }}
          visible={isTrackerOpen}
          onClose={() => setIsTrackerOpen(false)}
        >
          <Tabs
            defaultActiveKey="0"
            tabBarStyle={{
              padding: ".5rem 2rem 0px 2rem",
              fontWeight: "500",
              marginBottom: "0px",
            }}
          >
            <Tabs.TabPane key={0} tab={"Steps"}>
              {/* Route Tracker */}
              {selectedOption ? (
                <Steps
                  direction="vertical"
                  current={lastReportedTiplocIndex || 0}
                  className="custom-dot-size custom-step-distance w-auto"
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
            </Tabs.TabPane>
            {selectedOption ? (
              <Tabs.TabPane key={1} tab={"Details"}>
                {/* {console.log("Route im working on :)", selectedOption)} */}

                {/* Top Bar */}
                <div className="bg-slate-100 w-full h-full p-4 shadow-md">
                  <h1 className="text-center font-bold text-xl">
                    {selectedOption.tiploc.toc_Name}
                  </h1>
                  <h1 className="text-center text-blue-600 text-lg">
                    {selectedOption.tiploc.originTiploc} -{" "}
                    {selectedOption.tiploc.destinationTiploc}
                  </h1>
                  <h1 className="text-center font-bold text-lg">
                    <Tag className="font-semibold text-gray-600">
                      {selectedOption.tiploc.headCode}
                    </Tag>
                    {selectedOption.tiploc.lastReportedLocation ===
                    selectedOption.tiploc.destinationLocation ? (
                      <Tag className="font-semibold" color="warning">
                        Terminated
                      </Tag>
                    ) : selectedOption.tiploc.cancelled ? (
                      <Tag className="font-semibold" color="red">
                        Cancelled
                      </Tag>
                    ) : (
                      <Tag className="font-semibold" color="green">
                        Active
                      </Tag>
                    )}
                  </h1>
                </div>

                {/* Train Details */}
                <>
                  <div className="bg-slate-50 border-t-2 border-b-2">
                    <p>
                      <strong>Train Details</strong>
                    </p>
                    <p>ID: {selectedOption.tiploc.trainId}</p>
                    <p>Head Code: {selectedOption.tiploc.headCode}</p>
                    <p>
                      Service Code: {selectedOption.tiploc.trainServiceCode}
                    </p>
                    <p>UID: {selectedOption.tiploc.trainUid}</p>
                    <p>
                      Off Route:{" "}
                      {selectedOption.tiploc.offRoute ? "True" : "False"}
                    </p>
                  </div>
                </>

                {/* Schedule Details */}
                <>
                  <div className="bg-slate-50 border-b-2">
                    <p>
                      <strong>Schedule Details</strong>
                    </p>
                    <p>ID: {selectedOption.tiploc.scheduleId}</p>
                    <p>Stops: {selectedOption.schedule.length}</p>
                    <p>
                      Repeating:{" "}
                      {selectedOption.schedule.scheduleJustForToday
                        ? "Yes"
                        : "No"}
                    </p>
                    <p>Sector Code: {selectedOption.tiploc.sector_Code}</p>
                    <p>Departure: {selectedOption.tiploc.scheduledDeparture}</p>
                    <p>Arrival: {selectedOption.tiploc.scheduledArrival}</p>
                    <p>
                      Destination: {selectedOption.tiploc.destinationLocation}
                    </p>
                    <p>
                      Destination Tiploc:{" "}
                      {selectedOption.tiploc.destinationTiploc}
                    </p>
                    <p>Origin: {selectedOption.tiploc.originLocation}</p>
                    <p>Origin Tiploc: {selectedOption.tiploc.originTiploc}</p>
                    <p>
                      Last Location:{" "}
                      {selectedOption.tiploc.lastReportedLocation}
                    </p>
                  </div>
                </>

                {/* Cancelled */}
                {selectedOption.tiploc.cancelled ? (
                  <>
                    <div className="bg-slate-50 border-b-2">
                      <p>
                        <strong>Cancelled</strong>
                      </p>
                      <p>
                        Cancelled:{" "}
                        {selectedOption.tiploc.cancelled ? "Yes" : "No"}
                      </p>
                      <p>
                        {selectedOption.tiploc.cancelledAtOrigin
                          ? "Point: Origin"
                          : null}
                      </p>
                      <p>
                        {selectedOption.tiploc.cancelledAtOrigin
                          ? "Point: En Route"
                          : null}
                      </p>
                      <p>
                        {selectedOption.tiploc.cancelledImmediatly
                          ? "Timing: Immediately"
                          : null}
                      </p>
                      <p>
                        {selectedOption.tiploc.cancelledOutOfPlan
                          ? "Timing: Unplanned"
                          : null}
                      </p>
                      <p>
                        {selectedOption.tiploc.cancelled
                          ? `Timestamp: ${selectedOption.tiploc.cancelledTimestamp}`
                          : null}
                      </p>
                    </div>
                  </>
                ) : null}
              </Tabs.TabPane>
            ) : (
              <p className="text-center mt-2 text-gray-400">
                Please select a route to view its steps.
              </p>
            )}
          </Tabs>
        </Drawer>
        {/* Second menu drawer */}
        <Drawer
          title="Track New Route"
          closable={true}
          onClose={() => {
            setSearchText("");
            openCloseChildrenDrawer();
          }}
          open={childrenDrawer}
          placement={"left"}
          closeIcon={<Icon iconName="close" />}
          bodyStyle={{ padding: 0 }}
        >
          <Filter
            isOpen={searchFilterModal}
            setOpen={setSearchFilterModal}
            defaultKey="2"
          />
          {/* Search box on second menu */}
          <Input
            placeholder={`Search ${filteredRoutes.length.toLocaleString()} Routes`}
            allowClear
            size="large"
            prefix={<Icon className="px-1" iconName="search" />}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            style={{
              borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
              marginTop: "-1px",
              borderRight: "none",
              borderLeft: "none",
              borderRadius: "0",
              padding: "1rem 1rem",
            }}
            value={searchText}
            suffix={
              <Button
                onClick={() =>
                  setSearchFilterModal(searchFilterModal ? false : true)
                }
                type="text"
                className="px-1"
              >
                <Badge status="processing" dot={displayDot()}>
                  <Icon iconName="filter" />
                </Badge>
              </Button>
            }
          />

          {routes && routes.length > 0 && (
            <List
              size="large"
              dataSource={filteredRoutes}
              loading={filterLoading}
              style={{ size: "200px" }}
              renderItem={(item) => (
                <MyPopupConfirm
                  title="Track Route"
                  description="Are you sure you want to track this route?"
                  onConfirm={async () => {
                    setSearchText("");
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

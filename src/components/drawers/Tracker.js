// ------------------- External Libraries -------------------
import React, { useState, useEffect } from "react";
import { Drawer, Steps, Select } from "antd";

// ------------------- Internal Components -------------------
import MyInput from "./routes/Input.js";
import MyPopupConfirm from "./routes/PopupConfirm.js";
import MyListItem from "./routes/ListItem.js";
import Search from "./routes/SearchFunction.js";

// ------------------- Style Utilities -------------------
import { getBackgroundColor, getHoverStyles } from "./routes/ListItemStyle.js";
import "../../css/steps.css";

// ------------------- Custom Hooks -------------------
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";
import { UseRoutes } from "../../hooks/RoutesHook.js";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook.js";

// ------------------- API Functions -------------------
import { tiplocAPI } from "../../api/tiplocAPI.js";
import { detailAPI } from "../../api/detailAPI.js";

// ------------------- CSS Styles -------------------
import "../../css/drawer.css";

// ------------------- Icons -------------------
import Icon from "../Icons.js";

const { Option } = Select;

const Tracker = (props) => {
  // ------------------- useState -------------------
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  // Routes
  const [searchText, setSearchText] = useState("");
  const [searchedRoutes, setSearchedRoutes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  // Track Routes
  const [trackedSearchText, setTrackedSearchText] = useState("");
  const [trackedSearchedRoutes, setTrackedSearchedRoutes] = useState([]);

  // ------------------- Custom Hooks -------------------
  const { trackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

  // ------------------- Functions -------------------

  // ------------------- useEffects -------------------
  useEffect(() => {
    console.log("Selected Option", selectedOption);
  }, [selectedOption]);

  // ------------------- Local Variables -------------------
  // This are to set common styles for both drawers at once
  const placement = "left";
  const closeIcon = <Icon iconName="close" />;
  const listStyle = { size: "200px" };
  const drawerStyle = { padding: 0 };
  const description = "This is a description.";

  return (
    <>
      {/* First menu drawer */}
      <Drawer
        title="Route Tracker"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={props.isOpen}
        placement={placement}
        closeIcon={closeIcon}
        bodyStyle={drawerStyle}
      >
        {/* Selection Method */}

        {/* Dropdown for tracked routes */}
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
                route.tiploc.originTiploc + "-" + route.tiploc.destinationTiploc
              }
            >
              {route.tiploc.originTiploc + "-" + route.tiploc.destinationTiploc}
            </Option>
          ))}
        </Select>

        {/* Route Tracker */}
        {selectedOption ? (
          <Steps
            direction="vertical"
            current={1}
            className="custom-dot-size custom-step-distance"
          >
            {selectedOption.schedule.map((scheduleItem, index) => (
              <Steps.Step
                key={index}
                title={scheduleItem.tiploc}
                description={scheduleItem.location}
              />
            ))}
          </Steps>
        ) : (
          <p>Please select a route to view its steps.</p>
        )}
      </Drawer>
    </>
  );
};

export default Tracker;

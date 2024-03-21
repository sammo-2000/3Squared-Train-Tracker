import { useState, useEffect } from "react";

// Hooks
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook";
import { useMap } from "../../hooks/MapHook";
import { useSettings } from "../../hooks/SettingsHook";
import { useFilter } from "../../hooks/FilterHook";
import { UseRoutes } from "../../hooks/RoutesHook.js";

// Context

// Ant Design
import {
  Drawer,
  Space,
  Button,
  Input,
  Tabs,
  List,
  Popconfirm,
  Menu,
  Badge,
} from "antd";

// Icons
import Icon from "../Icons";

// CSS
import "../../css/drawer.css";

// Cookies
import Cookies from "js-cookie";

// Modals
import LocationDetails from "../modals/LocationDetails";
import Filter from "../modals/Filter";
import LocationListItem from "./locations/LocationListItem";

// Drawer
import TrackNewLocationDrawer from "./locations/TrackNewLocationDrawer";

// Functions
import {
  displayDot,
  inUseFilterLocations,
  searchFilterLocations,
  sortLocations,
  optionsFilterLocations,
} from "./locations/LocationFunctions";

const Locations = ({ ref1, ...props }) => {
  // Data
  const [data, setData] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState({});

  // Notifications
  const [notificationContext, notificationApi] = props.notifications;
  const [messageContext, messageApi] = props.messages;

  // Modals
  const [detailsModal, setDetailsModal] = useState(false);
  const [searchFilterModal, setSearchFilterModal] = useState(false);

  // Filtering
  const [searchText, setSearchText] = useState("");

  // Custom Hooks
  const { trackedLocations, setTrackedLocations } = UseTrackedLocations();
  const { map, setMap } = useMap();
  const { settings, setSettings } = useSettings();
  const { filter, setFilter } = useFilter();

  // Drawers
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  // Validate notification settings
  const validateNotification = (notification) => {
    return (
      settings.notifications.includes(notification) ||
      settings.notifications.includes("locations")
    );
  };

  // Handle tracked location click menu events
  const onTrackedLocationClick = (item, e) => {
    if (e.key === "view-details") {
      setDetailsModal(true);
      setSelectedDetails(item);
    }

    if (e.key === "view-routes") {
      // Close the drawer
      Cookies.set("openDrawer", item.Tiploc);
      props.setActiveDraw("routes");
    }

    if (e.key === "stop-tracking") {
      setTrackedLocations(trackedLocations.filter((i) => i !== item));
      Cookies.remove("tiploc_" + item.Tiploc);

      if (validateNotification("showLocationStopTrack")) {
        messageApi.open({
          type: "success",
          content: "Location removed from tracking",
        });
      }
    }
  };

  // Set a tracked location
  const setTracked = (item) => {
    if (settings.menuAutoClose.value === true) {
      setChildrenDrawer(false);
    }

    setSearchText("");
    setTrackedLocations([...trackedLocations, item]);

    // Inform user that routes are being loaded
    if (validateNotification("showRoutesLoading")) {
      notificationApi.open({
        message: "Routes loading...",
        description:
          "Please wait while we load routes from your selected location. This may take a few seconds.",
        duration: 5,
      });
    }
  };

  // Loads locations from JSON file
  useEffect(() => {
    if (data.length === 0 && childrenDrawer === true) {
      import("../../assets/data/tiplocs.json").then((newData) => {
        setData(newData.Tiplocs);
        messageApi.open({
          type: "success",
          content:
            newData.Tiplocs.length.toLocaleString() + " locations loaded.",
        });
      });
    }
  });

  // Filter locations
  const filteredData = data
    .filter((item) => inUseFilterLocations(item, trackedLocations))
    .filter((item) => searchFilterLocations(item, searchText))
    .sort((a, b) => sortLocations(a, b, searchText))
    .filter((item) => optionsFilterLocations(item, filter));

  // Filter tracked locations
  const filteredTrackedLocations = trackedLocations
    .filter((item) => searchFilterLocations(item, searchText))
    .sort((a, b) => sortLocations(a, b, searchText))
    .filter((item) => optionsFilterLocations(item, filter));

  return (
    <>
      <LocationDetails
        isOpen={detailsModal}
        setOpen={setDetailsModal}
        location={selectedDetails}
      />
      <Drawer
        title="Tracked Locations"
        onClose={() => {
          setSearchText("");
          props.setActiveDraw("menu");
        }}
        open={props.isOpen}
        placement={settings.menuDirection.value}
        closeIcon={<Icon iconName="back" />}
        bodyStyle={{ padding: 0 }}
        extra={
          <Space>
            <Button
              onClick={() => setChildrenDrawer(true)}
              shape="circle"
              type="primary"
              ghost
              icon={<Icon iconName="add" />}
            ></Button>
          </Space>
        }
      >
        <Filter
          isOpen={searchFilterModal}
          setOpen={setSearchFilterModal}
          defaultKey="1"
        />
        <Input
          placeholder={`Search ${filteredTrackedLocations.length.toLocaleString()} Tracked Locations`}
          allowClear
          size="large"
          prefix={<Icon className="px-1" iconName="search" />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            marginTop: "-1px",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "0",
            padding: "1rem 1rem",
          }}
          suffix={
            <Button
              onClick={() =>
                setSearchFilterModal(searchFilterModal ? false : true)
              }
              type="text"
              className="px-1"
            >
              <Badge status="processing" dot={displayDot(filter)}>
                <Icon iconName="filter" />
              </Badge>
            </Button>
          }
        />

        <List
          size="large"
          pagination={{
            defaultPageSize: settings.pagination.value,
            showSizeChanger: false,
          }}
          dataSource={filteredTrackedLocations}
          renderItem={(item) => (
            <List.Item
              className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer"
              onMouseEnter={(e) => {
                setMap(
                  map.setView(
                    [item.Latitude, item.Longitude],
                    settings.inspectZoom
                  )
                );
              }}
              onMouseLeave={(e) => {
                setMap(
                  map.setView(
                    [
                      settings.defaultCenter.Latitude,
                      settings.defaultCenter.Longitude,
                    ],
                    6
                  )
                );
              }}
            >
              <Menu
                onClick={(e) => onTrackedLocationClick(item, e)}
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
                    label: <LocationListItem showRoutes item={item} />,
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
                      {
                        key: "view-routes",
                        label: "View routes",
                        onClick: null,
                      },
                    ],
                  },
                ]}
              />
            </List.Item>
          )}
        />

        <TrackNewLocationDrawer
          childrenDrawer={childrenDrawer}
          setChildrenDrawer={setChildrenDrawer}
          data={data}
          setTracked={setTracked}
        />
      </Drawer>
    </>
  );
};

export default Locations;

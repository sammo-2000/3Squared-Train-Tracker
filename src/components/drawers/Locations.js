import {
  Drawer,
  Space,
  Button,
  Input,
  Tabs,
  List,
  Popconfirm,
  notification,
  Menu,
  message,
} from "antd";

import "../../css/drawer.css";
import { useState, useEffect } from "react";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook";
import { useMap } from "../../hooks/MapHook";
import { useSettings } from "../../hooks/SettingsHook";
import { findNotification } from "../../contexts/SettingsContext";

import Icon from "../Icons";

import LocationDetails from "../modals/LocationDetails";

import Cookies from "js-cookie";

import { BranchesOutlined } from "@ant-design/icons";

const Locations = (props) => {
  const { trackedLocations, setTrackedLocations } = UseTrackedLocations();
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [data, setData] = useState([]);
  const [notificationContext, notificationApi] = props.notifications;
  const [messageContext, messageApi] = props.messages;
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const { map, setMap } = useMap();
  const { settings, setSettings } = useSettings();

  const validateNotification = (notification) => {
    return (
      settings.notifications.includes(notification) ||
      settings.notifications.includes("locations")
    );
  };

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

  const setTracked = (item) => {
    if (settings.menuAutoClose.value === true) {
      setChildrenDrawer(false);
    }

    setSearchText("");
    setRecentlyUsed([...recentlyUsed, item]);
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

    // Inform user that item was added to their 'recently used' list
    if (
      validateNotification("showRecents") &&
      recentlyUsed.length === 0 &&
      trackedLocations.length === 0
    ) {
      notificationApi.open({
        message: "Recently Used",
        description:
          "A location was added to your recently used list, you can disable this in settings.",
        duration: 5,
      });
    }
  };

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
        <Input
          placeholder="Search Locations"
          allowClear
          size="large"
          prefix={<Icon iconName="search" />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            marginTop: "-1px",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "0",
            padding: "1rem 1rem",
          }}
        />

        <List
          size="large"
          pagination={{
            defaultPageSize: settings.pagination.value,
            showSizeChanger: false,
          }}
          dataSource={trackedLocations.filter((item) => {
            return item.DisplayName.toLowerCase().includes(
              searchText.toLowerCase()
            );
          })}
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
                    label: item.DisplayName,
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

        <Drawer
          title="Track New Location"
          closable={true}
          onClose={() => setChildrenDrawer(false)}
          open={childrenDrawer}
          placement={settings.menuDirection.value}
          closeIcon={<Icon iconName="close" />}
          bodyStyle={{ padding: 0 }}
        >
          <Input
            placeholder="Search TIPLOCs"
            allowClear
            size="large"
            prefix={<Icon iconName="search" />}
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
          />

          <Tabs
            defaultActiveKey="0"
            tabBarStyle={{
              padding: ".5rem 2rem 0px 2rem",
              fontWeight: "500",
              marginBottom: "0px",
            }}
          >
            <Tabs.TabPane key={0} tab="All">
              <List
                size="large"
                loading={data.length === 0 ? true : false}
                dataSource={data.filter((item) => {
                  return (
                    (item.DisplayName.toLowerCase().includes(
                      searchText.toLowerCase()
                    ) ||
                      item.Tiploc.toLowerCase().includes(
                        searchText.toLowerCase()
                      )) &&
                    !trackedLocations.some(
                      (trackedItem) => trackedItem.Tiploc === item.Tiploc
                    )
                  );
                })}
                pagination={{
                  defaultPageSize: settings.pagination.value,
                  showSizeChanger: false,
                }}
                renderItem={(item) => (
                  <Popconfirm
                    onClick={(e) => {
                      setMap(map.setView([item.Latitude, item.Longitude], 14));
                    }}
                    icon={null}
                    title="Track location"
                    description="Are you sure you want to track this location?"
                    onConfirm={() => setTracked(item)}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.DisplayName}</div>
                      <div>{item.Tiploc}</div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key={1} tab="Recently Used">
              <List
                size="large"
                pagination={{
                  defaultPageSize: settings.pagination.value,
                  showSizeChanger: false,
                }}
                dataSource={recentlyUsed.filter((item) => {
                  return (
                    item.DisplayName.toLowerCase().includes(
                      searchText.toLowerCase()
                    ) &&
                    !trackedLocations.some(
                      (trackedItem) => trackedItem.Tiploc === item.Tiploc
                    )
                  );
                })}
                renderItem={(item) => (
                  <Popconfirm
                    onClick={(e) => {
                      setMap(map.setView([item.Latitude, item.Longitude], 14));
                    }}
                    icon={null}
                    title="Track location"
                    description="Are you sure you want to track this location?"
                    onConfirm={() => setTracked(item)}
                    onCancel={() =>
                      setRecentlyUsed(recentlyUsed.filter((i) => i !== item))
                    }
                    okText="Yes"
                    cancelText="Remove from recently used"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.DisplayName}</div>
                      <div>{item.Tiploc}</div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
          </Tabs>
        </Drawer>
      </Drawer>
    </>
  );
};

export default Locations;

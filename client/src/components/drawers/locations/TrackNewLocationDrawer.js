import React, { useState } from "react";
import {
  Drawer,
  Input,
  Button,
  Badge,
  Tabs,
  List,
  Popconfirm,
  Tooltip,
} from "antd";
import Icon from "../../Icons";
import LocationListItem from "./LocationListItem";
import { useSettings } from "../../../hooks/SettingsHook";
import { useMap } from "../../../hooks/MapHook";
import {
  displayDot,
  inUseFilterLocations,
  searchFilterLocations,
  sortLocations,
  optionsFilterLocations,
  getDistanceFromLatLonInKm,
} from "./LocationFunctions";
import { useFilter } from "../../../hooks/FilterHook";
import Filter from "../../modals/Filter";

const TrackNewLocationDrawer = ({
  childrenDrawer,
  setChildrenDrawer,
  data,
  setTracked,
  trackedLocations,
}) => {
  const { settings, setSettings } = useSettings();
  const { map, setMap } = useMap();
  const { filter, setFilter } = useFilter();

  // States
  const [searchText, setSearchText] = useState("");
  const [searchFilterModal, setSearchFilterModal] = useState(false);

  // Filter locations
  const filteredData = data
    .filter((item) => inUseFilterLocations(item, trackedLocations))
    .filter((item) => searchFilterLocations(item, searchText))
    .sort((a, b) => sortLocations(a, b, searchText))
    .filter((item) => optionsFilterLocations(item, filter));

  const nearbyFilteredData = data
    .filter((item) => inUseFilterLocations(item, trackedLocations))
    .filter((item) => searchFilterLocations(item, searchText))
    .filter((item) => optionsFilterLocations(item, filter))
    .sort((a, b) => {
      const dCLat = settings.defaultCenter.Latitude;
      const dCLong = settings.defaultCenter.Longitude;

      const distanceA = getDistanceFromLatLonInKm(
        dCLat,
        dCLong,
        a.Latitude,
        a.Longitude
      );
      const distanceB = getDistanceFromLatLonInKm(
        dCLat,
        dCLong,
        b.Latitude,
        b.Longitude
      );
      return distanceA - distanceB;
    });

  return (
    <Drawer
      title="Track New Location"
      closable={true}
      onClose={() => {
        setSearchText("");
        setChildrenDrawer(false);
      }}
      open={childrenDrawer}
      placement={settings.menuDirection.value}
      closeIcon={<Icon iconName="close" />}
      bodyStyle={{ padding: 0 }}
    >
      <Filter
        isOpen={searchFilterModal}
        setOpen={setSearchFilterModal}
        defaultKey="1"
      />
      <Input
        placeholder={`Search ${filteredData.length.toLocaleString()} Locations`}
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

      <Tabs
        defaultActiveKey="0"
        tabBarStyle={{
          padding: ".5rem 2rem 0px 2rem",
          fontWeight: "500",
          marginBottom: "0px",
        }}
      >
        <Tabs.TabPane key={0} tab={searchText !== "" ? "Filtered" : "All"}>
          <List
            size="large"
            loading={data.length === 0 ? true : false}
            dataSource={filteredData}
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
                  <LocationListItem item={item} />
                </List.Item>
              </Popconfirm>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={1}
          destroyInactiveTabPane={true}
          tab={
            <>
              <Tooltip
                title="Based on your default center, you can change this in settings."
                trigger="hover"
                placement="bottom"
              >
                Near You
              </Tooltip>
            </>
          }
        >
          <List
            lazy={true}
            size="large"
            loading={data.length === 0 ? true : false}
            dataSource={nearbyFilteredData}
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
                  <LocationListItem item={item} />
                </List.Item>
              </Popconfirm>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
};

export default TrackNewLocationDrawer;

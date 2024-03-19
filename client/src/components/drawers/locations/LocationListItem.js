import React from "react";
import { Tag } from "antd";
import { useSettings } from "../../../hooks/SettingsHook";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const LocationListItem = ({ item }) => {
  const { settings, setSettings } = useSettings();

  return (
    <div class="block">
      <h3 class="text-base sm:text-lg font-semibold text-gray-800 ">
        {item.Name}
      </h3>
      <p class="mt-1 text-gray-600 dark:text-gray-400">
        {item.Tiploc} -{" "}
        {getDistanceFromLatLonInKm(
          settings.defaultCenter.Latitude,
          settings.defaultCenter.Longitude,
          item.Latitude,
          item.Longitude
        )}{" "}
        km Away
      </p>
      <div className="flex gap-x-1 mt-2">
        {item.Stanox !== null ? (
          <Tag className="font-semibold text-gray-600">#{item.Stanox}</Tag>
        ) : null}
        {item.Details.OffNetwork !== "" && item.Details.OffNetwork === false ? (
          <Tag className="font-semibold" color="success">
            Online
          </Tag>
        ) : (
          <Tag className="font-semibold" color="warning">
            Offline?
          </Tag>
        )}
      </div>
    </div>
  );
};

export default LocationListItem;

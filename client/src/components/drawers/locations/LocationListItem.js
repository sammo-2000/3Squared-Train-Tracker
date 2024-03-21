import React from "react";
import { Tag } from "antd";
import { useSettings } from "../../../hooks/SettingsHook";
import { getDistanceFromLatLonInKm } from "./LocationFunctions";
import { UseRoutes } from "../../../hooks/RoutesHook";

const LocationListItem = ({ item, showRoutes }) => {
  const { settings, setSettings } = useSettings();
  const { routes, setRoutes } = UseRoutes();

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
        {routes.length > 0 && showRoutes === true ? (
          <Tag className="font-semibold" color="cyan">
            {routes
              .filter((route) => route.originTiploc === item.Tiploc)
              .length.toLocaleString()}{" "}
            Routes
          </Tag>
        ) : null}
      </div>
    </div>
  );
};

export default LocationListItem;

import React, { useEffect } from "react";

// Import hooks to use them globally
import { UseTrackedLocations } from "../hooks/TrackedLocationsHook";
import { UseRoutes } from "../hooks/RoutesHook";
import { UseTrackedRoutes } from "../hooks/TrackedRoutesHook";
import { useSettings } from "../hooks/SettingsHook";

// js-cookie
import Cookies from "js-cookie";

const Storage = () => {
  const { trackedLocations, setTrackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();
  const { settings, setSettings } = useSettings();

  // Write Tracked Locations
  useEffect(() => {
    if (trackedLocations.length > 0) {
      trackedLocations.forEach((tiploc) => {
        const cookieName = "tiploc_" + tiploc.Tiploc;
        if (!Cookies.get(cookieName)) {
          Cookies.set(cookieName, JSON.stringify(tiploc));
        }
      });
    }
  }, [trackedLocations]);

  // Write Routes
  useEffect(() => {}, [routes]);

  useEffect(() => {
    if (trackedRoutes.length > 0) {
      trackedRoutes.forEach((trackedRoute) => {
        const storageKey =
          "tracked_route_" +
          trackedRoute.tiploc.activationId +
          "," +
          trackedRoute.tiploc.toc_Name;
        if (!localStorage.getItem(storageKey)) {
          localStorage.setItem(storageKey, JSON.stringify(trackedRoute));
        }
      });
    }
  }, [trackedRoutes]);

  // Write Settings
  useEffect(() => {
    if (settings.length > 0) {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    // Read Tracked Locations from cookies
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((cookieName) => {
      if (cookieName.startsWith("tiploc_")) {
        const tiploc = JSON.parse(cookies[cookieName]);
        const tiplocName = cookieName.replace("tiploc_", ""); // Remove 'tiploc_' prefix
        setTrackedLocations((prevLocations) => {
          if (
            !prevLocations.some((location) => location.Tiploc === tiplocName)
          ) {
            return [...prevLocations, tiploc];
          }
          return prevLocations;
        });
      }
    });

    let _trackedRoutes = [];
    let _trackedRoutesID = [];

    // Read Tracked Routes from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tracked_route_")) {
        const trackedRoute = JSON.parse(localStorage.getItem(key));
        const noTrackedRoutes = key.replace("tracked_route_", "");
        const activationId = noTrackedRoutes.split(",")[0];
        const operator = noTrackedRoutes.split(",")[1];

        const exists = _trackedRoutesID.some(
          (item) => item.ID === activationId && item.operator === operator
        );

        if (!exists) {
          // console.log(trackedRoute);
          _trackedRoutes.push(trackedRoute);
          _trackedRoutesID.push({
            ID: activationId,
            operator: operator,
          });
        }
      }
    });

    setTrackedRoutes(_trackedRoutes);
  }, [setTrackedLocations, setTrackedRoutes]);

  // Read settings from localStorage
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, []);

  return <></>;
};

export default Storage;

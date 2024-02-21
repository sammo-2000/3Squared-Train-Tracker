import React, { useEffect } from "react";

// Import hooks to use them globally
import { UseTrackedLocations } from "../hooks/TrackedLocationsHook";
import { UseRoutes } from "../hooks/RoutesHook";
import { UseTrackedRoutes } from "../hooks/TrackedRoutesHook";

// js-cookie
import Cookies from "js-cookie";

const Storage = () => {

    const { trackedLocations, setTrackedLocations } = UseTrackedLocations();
    const { routes, setRoutes } = UseRoutes();
    const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

    // Write Tracked Locations
    useEffect(() => {
        if (trackedLocations.length > 0) {
            trackedLocations.forEach(tiploc => {
              const cookieName = "tiploc_" + tiploc.Tiploc;
                if (!Cookies.get(cookieName)) {
                Cookies.set(cookieName, JSON.stringify(tiploc));
              }
            });
        }
    }, [trackedLocations]);

    // Write Routes
    useEffect(() => {

    }, [routes]);

    // Write Tracked Routes
    useEffect(() => {

    }, [trackedRoutes]);

    // Set up cookies when page first load
    useEffect(() => {

        const cookies = Cookies.get();
        Object.keys(cookies).forEach(cookieName => {

            // Read Tracked Locations
            if (cookieName.startsWith('tiploc_')) {
                const tiploc = JSON.parse(cookies[cookieName]);
                const tiplocName = cookieName.replace('tiploc_', ''); // Remove 'tiploc_' prefix
                setTrackedLocations(prevLocations => {
                if (!prevLocations.some(location => location.Tiploc === tiplocName)) {
        
                    return [...prevLocations, tiploc];
                }
                return prevLocations;
                });
            }

            // Read Routes
            if (cookieName.startsWith('route_')) {

            }

            // Read Tracked Routes
            if (cookieName.startsWith('trackedRoute_')) {

            }
        });

    }, [setTrackedLocations, setRoutes, setTrackedRoutes]);
  
    return <></>;
}

export default Storage

const loadTrackedLocations = () => { 

  }

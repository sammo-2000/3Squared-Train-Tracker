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

    useEffect(() => {
        if (trackedRoutes.length > 0) {
            trackedRoutes.forEach(trackedRoute => {
                const storageKey = "tracked_route_" + trackedRoute.tiploc.activationId + "," + trackedRoute.tiploc.toc_Name;
                if (!localStorage.getItem(storageKey)) {
                    localStorage.setItem(storageKey, JSON.stringify(trackedRoute));
                }
            });
        }
    }, [trackedRoutes]);

    useEffect(() => {
        // Read Tracked Locations from cookies
        const cookies = Cookies.get();
        Object.keys(cookies).forEach(cookieName => {
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
        });
    
        // Read Tracked Routes from localStorage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('tracked_route_')) {
                const trackedRoute = JSON.parse(localStorage.getItem(key));
                const activationId = key.replace('tracked_route_', ''); // Remove 'route_' prefix
                setTrackedRoutes(prevRoutes => {
                    if (!prevRoutes.some(route => route.tiploc.activationId === activationId)) {
                        return [...prevRoutes, trackedRoute];
                    }
                    return prevRoutes;
                });
            }
        });
    }, [setTrackedLocations, setTrackedRoutes]);
  
    return <></>;
}

export default Storage

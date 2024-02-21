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
    // useEffect(() => {
    //     if (trackedRoutes.length > 0) {
    //         trackedRoutes.forEach(trackedRoute => {
    //           const cookieName = "route_" + trackedRoute.tiploc.activationId;
    //             if (!Cookies.get(cookieName)) {
    //             Cookies.set(cookieName, JSON.stringify(trackedRoute));
    //           }
    //         // console.log("Tracked Route Obj:", trackedRoute)
    //         // console.log("Tracked Route aid:", trackedRoute.tiploc.activationId)
    //         });
    //     }
    // }, [trackedRoutes]);
    useEffect(() => {
        if (trackedRoutes.length > 0) {
            trackedRoutes.forEach(trackedRoute => {
                const storageKey = "tracked_route_" + trackedRoute.tiploc.activationId;
                if (!localStorage.getItem(storageKey)) {
                    localStorage.setItem(storageKey, JSON.stringify(trackedRoute));
                }
            });
        }
    }, [trackedRoutes]);

    // // Set up cookies when page first load
    // useEffect(() => {

    //     const cookies = Cookies.get();
    //     Object.keys(cookies).forEach(cookieName => {

    //         // Read Tracked Locations
    //         if (cookieName.startsWith('tiploc_')) {
    //             const tiploc = JSON.parse(cookies[cookieName]);
    //             const tiplocName = cookieName.replace('tiploc_', ''); // Remove 'tiploc_' prefix
    //             setTrackedLocations(prevLocations => {
    //             if (!prevLocations.some(location => location.Tiploc === tiplocName)) {
        
    //                 return [...prevLocations, tiploc];
    //             }
    //             return prevLocations;
    //             });
    //         }

    //         // Read Routes
    //         if (cookieName.startsWith('route_')) {

    //         }

    //         // Read Tracked Routes
    //         if (cookieName.startsWith('tracked_route_')) {
    //             Object.keys(localStorage).forEach((key) => {
    //                 if (key.startsWith('tracked_route_')) {
    //                     const trackedRoute = JSON.parse(localStorage.getItem(key));
    //                     const activationId = key.replace('tracked_route_', ''); // Remove 'route_' prefix
    //                     setTrackedRoutes(prevRoutes => {
    //                         if (!prevRoutes.some(route => route.tiploc.activationId === activationId)) {
    //                             console.log("Tracked Route new:", trackedRoutes)
    //                             return [...prevRoutes, trackedRoute];
    //                         }
    //                         return prevRoutes;
    //                     });
    //                 }
    //             });
    //         }
    //     });

    // }, [setTrackedLocations, setRoutes, setTrackedRoutes]);

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
                        console.log("Tracked Route new:", trackedRoutes)
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

const loadTrackedLocations = () => { 

  }

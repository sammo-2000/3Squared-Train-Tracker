import React, { useState, useEffect } from 'react';

// js-cookie
import Storage from "js-cookie";

// Data
import { UseSelectedTiploc } from "../hooks/SelectedTiplocHook";



export function saveCookie(type, data)
{

    // Tiplocs
    if (type === "tiploc") {
        if (data.length > 0) {
            data.forEach(tiploc => {
              const cookieName = "tiploc_" + tiploc.Tiploc;
              if (!Cookies.get(cookieName)) {
                Storage.set(cookieName, JSON.stringify(tiploc));
              }
            });
        }
    }

    // Routes
    if (type === "routes") {
        if (data.length > 0) {
            data.forEach(route => {
              const cookieName = "route_" + route.Route; // This will need changing depending on the route object...
              if (!Storage.get(cookieName)) {
                Storage.set(cookieName, JSON.stringify(route));
              }
            });
        }
    }

}

export function getCookie(type)
{
    if (type === "tiploc")
    {
        const { selectedTiploc, setSelectedTiploc } = UseSelectedTiploc();
        const cookies = Storage.get();
        Object.keys(cookies).forEach(cookieName => {
          if (cookieName.startsWith('tiploc_')) {
            const tiploc = JSON.parse(cookies[cookieName]);
            const tiplocName = cookieName.replace('tiploc_', ''); // Remove 'tiploc_' prefix
            setSelectedTiploc(prevLocations => {
              if (!prevLocations.some(location => location.Tiploc === tiplocName)) {
    
                return [...prevLocations, tiploc];
              }
              return prevLocations;
            });
          }
        });
    }
}

const Cookies = () => {
  return (
    <>
    {/* {getCookie()} */}
    </>
  );
};



export default Cookies
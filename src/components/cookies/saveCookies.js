import React from 'react'

// js-cookie
import Storage from "js-cookie";

export function saveCookie(type, data)
{

    // Tiplocs
    if (type === "tiploc") {
        if (data.length > 0) {
            data.forEach(tiploc => {
              const cookieName = "tiploc_" + tiploc.Tiploc;
              if (!Storage.get(cookieName)) {
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

function saveCookies() {
  return (
    <></>
  )
}

export default saveCookies
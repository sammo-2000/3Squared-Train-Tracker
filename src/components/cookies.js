import React from 'react'

// js-cookie
import Cookies from "js-cookie";



export function saveCookie(type, data){

    // Tiplocs
    if (type === "tiploc") {
        if (data.length > 0) {
            data.forEach(tiploc => {
              const cookieName = "tiploc_" + tiploc.Tiploc;
              if (!Cookies.get(cookieName)) {
                Cookies.set(cookieName, JSON.stringify(tiploc));
              }
            });
        }
    }

    // Routes
    if (type === "routes") {
        if (data.length > 0) {
            data.forEach(route => {
              const cookieName = "route_" + route.Route; // This will need changing depending on the route object...
              if (!Cookies.get(cookieName)) {
                Cookies.set(cookieName, JSON.stringify(route));
              }
            });
        }
    }

}

function cookies() {
  return (
    <div>cookies</div>
  )
}

export default cookies
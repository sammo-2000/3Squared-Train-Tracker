import React from "react";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useTheme } from "../hooks/ThemeHooks";
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";

// Cookies
import Cookies from "js-cookie";

const Map = () => {
  const { theme: themeFromHook } = useTheme();

  let theme;
  const themeCookie = Cookies.get("theme");

  if (themeCookie) {
    theme = themeCookie;
  } else {
    theme = themeFromHook;
  }

  const mapThemes = {
    1: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    2: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    3: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  return (
    <>
      <div className="map">
        <MapContainer
          center={[54.091617, -1.793925]}
          zoom={6}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            accessToken={process.env.REACT_APP_MAP_API_KEY}
            url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MapContainer, TileLayer } from "react-leaflet";
import { useTheme } from "../hooks/ThemeHooks";
import { useMap } from "../hooks/MapHook";

import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";

const Map = (props) => {
  const { map, setMap } = useMap();

  const zoomControls = "topleft"; // TODO: Settings

  const { theme: themeFromHook } = useTheme();
  // const [map, setMap] = useState(null);

  const center = props.center || [54.091617, -1.793925];
  const zoom = props.zoom || 6;

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

  // map.setView([2.091617, -1.793925], zoom);

  useEffect(() => {
    if (map) {
      map.zoomControl.setPosition(zoomControls);
    }
  }, [map]);

  return (
    <>
      <div className="map">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          whenReady={(e) => setMap(e.target)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            accessToken={process.env.REACT_APP_MAP_API_KEY}
            url={
              mapThemes[theme] ||
              "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
            }
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

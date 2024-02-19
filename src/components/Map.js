import React from "react";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useTheme } from "../hooks/ThemeHooks"; 
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import { map } from "leaflet";

const Map = () => {
  const { theme } = useTheme();
  

  const mapThemes = {
    1: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    2: 'https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}',
    3: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  return (
    <div className="map">
      <MapContainer
        center={[54.091617, -1.793925]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          accessToken={process.env.REACT_APP_MAP_API_KEY}
          url={mapThemes[theme] || 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'}
          // url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        />
      </MapContainer>

      {
      useEffect(() => {
        {console.log("Current Theme: ", mapThemes[theme])}
      }, )}

        <button
          className="absolute top-[5.5rem] left-0 w-[4%] h-1/1 flex-col text-center z-[1000] m-3 rounded-lg overflow-hidden shadow-box"
          // onClick={() => Map.([50, 20])}
        >
          Center
        </button>
    </div>
  );
};

export default Map;

import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import SetMarker from "./SetMarker";

const Map = () => {
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
          <SetMarker />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

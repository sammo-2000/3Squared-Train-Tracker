import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
<<<<<<< HEAD
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";

const center = [53.376910564855095, -1.4678105504280161];
=======
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import Marker from "./CustomMarker";
>>>>>>> a8cc38632bdcefec14a5373d8b0b8cc6e2bb562c

const Map = () => {
  return (
    <div className="map">
<<<<<<< HEAD
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
=======
      <MapContainer
        center={[54.091617, -1.793925]}
        zoom={6}
        scrollWheelZoom={true}
      >
>>>>>>> a8cc38632bdcefec14a5373d8b0b8cc6e2bb562c
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          accessToken={process.env.REACT_APP_API_KEY}
          url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        />
        <Marker
          Latitude={54.091617}
          Longitude={-1.793925}
          PopupContent={
            <h1>
              POPUP! <strong>Hello</strong>
            </h1>
          }
        />
      </MapContainer>
    </div>
  );
};

export default Map;

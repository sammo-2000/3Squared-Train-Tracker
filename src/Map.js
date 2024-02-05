import React from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./App.css";

const center = [52.998463846073854, -1.2682985457466047];

const Map = () => {
    return ( 
        <div className="map">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                accessToken='OBeurcX7indKcJFodZC7kgmeeVUxxuEQEaudIV52Y3WPawHl5sqthUP7erbK5P0s'
                url='https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    );
}
 
export default Map;
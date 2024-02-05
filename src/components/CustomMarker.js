import React from "react";
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ Latitude, Longitude, PopupContent, Icons }) => {
  return (
    <Marker position={[Latitude, Longitude]}>
      <Popup>{PopupContent}</Popup>
    </Marker>
  );
};

export default CustomMarker;

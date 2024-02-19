import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const CustomMarker = ({
  Latitude,
  Longitude,
  PopupContent,
  Icons = "train",
}) => {
  return (
    <Marker position={[Latitude, Longitude]} icon={CustomIcon(Icons)}>
      <Popup>{PopupContent}</Popup>
    </Marker>
  );
};
const CustomIcon = (IconName) => {
  const iconSize = [70, 70];

  if (IconName === "train") {
    return new L.icon({
      iconUrl: require("../icons/train.webp"),
      iconSize: iconSize,
    });
  } else if (IconName === "station") {
    return new L.icon({
      iconUrl: require("../icons/station.webp"),
      iconSize: iconSize,
    });
  } else if (IconName === "start") {
    return new L.icon({
      iconUrl: require("../icons/start.jpg"),
      iconSize: iconSize,
    });
  } else if (IconName === "end") {
    return new L.icon({
      iconUrl: require("../icons/end.jpg"),
      iconSize: iconSize,
    });
  } else {
    return new L.icon({
      iconUrl: require("../icons/train.webp"),
      iconSize: iconSize,
    });
  }
};

export default CustomMarker;

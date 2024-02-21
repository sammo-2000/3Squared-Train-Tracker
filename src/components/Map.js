import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "../hooks/MapHook";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import stationIcon from "../assets/icons/trainStation.png";
import LocationDetails from "./modals/LocationDetails";

// Hooks
import { useSettings } from "../hooks/SettingsHook";
import { UseTrackedLocations } from "../hooks/TrackedLocationsHook";
import StationMarker from "./StationMarker";

const Map = (props) => {
  const { map, setMap } = useMap();

  const zoomControls = "bottomleft"; // TODO: Settings

  const { trackedLocations, setTrackedLocations } = UseTrackedLocations();
  const { theme: themeFromHook } = useSettings();
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
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

  const trainStationIcon = new Icon({
    iconUrl: stationIcon,
    iconSize: [38, 38],
  });

  const mapThemes = {
    1: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    2: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    3: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  useEffect(() => {
    if (map) {
      map.zoomControl.setPosition(zoomControls);
    }
  }, [map]);

  return (
    <>
      <LocationDetails
        isOpen={detailsModal}
        setOpen={setDetailsModal}
        location={selectedDetails}
      />

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
          <StationMarker />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

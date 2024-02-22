import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  PolyLine,
} from "react-leaflet";
import { FloatButton } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { useMap } from "../hooks/MapHook";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import LocationDetails from "./modals/LocationDetails";
import TrainMarker from "./TrainMarker";

// Hooks
import { useSettings } from "../hooks/SettingsHook";
import { UseTrackedLocations } from "../hooks/TrackedLocationsHook";
import StationMarker from "./StationMarker";

import { giveMePlots } from "../APIUsageExample.v2";

const Map = (props) => {
  const { map, setMap } = useMap();

  const { settings, setSettings } = useSettings();
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  // const [map, setMap] = useState(null);

  const center = props.center || [54.091617, -1.793925];
  const zoom = props.zoom || 6;

  let theme = settings.mapTheme;
  let rails = settings.rails;

  useEffect(() => {
    // console.log(settings);
    if (map) {
      map.zoomControl.setPosition(settings.zoomControlsPosition.value);
    }
  }, [map, settings]);

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
              theme.url ||
              "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
            }
          />
          {rails.url != null && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              accessToken={process.env.REACT_APP_MAP_API_KEY}
              url={rails.url}
            />
          )}
          <FloatButton
            icon={<AimOutlined />}
            onClick={() =>
              setMap(
                map.setView(
                  [
                    settings.defaultCenter.Latitude,
                    settings.defaultCenter.Longitude,
                  ],
                  6
                )
              )
            }
            style={{
              zIndex: "1000",
              position: "absolute",
              right: "50%",
              bottom: "10px",
              backgroundColor: "white",
              border: "2px",
              borderColor: "gray-100",
            }}
          />
          ;
          <StationMarker />
          <TrainMarker />
          <PolyLine positions={giveMePlots} />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

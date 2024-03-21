import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { FloatButton } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { useMap } from "../hooks/MapHook";
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import LocationDetails from "./modals/LocationDetails";
import TrainMarker from "./map/TrainMarker";
import { plotPoints } from "../api/routePlottingAPI";
import MarkerClusterGroup from "react-leaflet-cluster";

// Hooks
import { useSettings } from "../hooks/SettingsHook";
import { UseTrackedLocations } from "../hooks/TrackedLocationsHook";
import { UseTrackedRoutes } from "../hooks/TrackedRoutesHook";
import StationMarker from "./map/StationMarker";
import StartEndMarkers from "./map/StartEndMarkers";
import TIPLOCMarkers from "./map/TIPLOCMarkers";

// Components
import setRouteOnMap from "./map/SetRouteOnMap";
import { Circle } from "react-leaflet";

// Context
import { MapContext } from "../contexts/MapContext";

const Map = React.forwardRef(({ setOpen, ...props }, ref4) => {
  const { map, setMap } = useMap();

  const { settings, setSettings } = useSettings();
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});

  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

  const center = props.center || [54.45088, -2.41332];
  const zoom = props.zoom || 6;

  let theme = settings.mapTheme;
  let rails = settings.rails;

  const [plotPointsState, setPlotPointsState] = useState([]);
  const [routeColor, setRouteColor] = useState([]);
  let routeColorArray = [];

  const setRouteComponent = () =>
    plotPointsState.map((train, index) => {
      if (!train.isSelected) {
        return setRouteOnMap(train, routeColor[index]);
      }
      return null;
    });

  useEffect(() => {
    const fetchData = async () => {
      const data = await plotPoints(trackedRoutes);
      await trackedRoutes.forEach((singleRoute) => {
        routeColorArray.push(singleRoute.color);
        setRouteColor(routeColorArray);
      });
      if (data.length > 0) {
        await setPlotPointsState(data);
      }
    };
    // s
    fetchData();
  }, [setPlotPointsState, trackedRoutes]);

  useEffect(() => {
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
          {rails.url != null && ( // This needs changing to update okay !!!!!
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              accessToken={process.env.REACT_APP_MAP_API_KEY}
              url={rails.url}
            />
          )}
          ;
          <MarkerClusterGroup
            showCoverageOnHover={false}
            removeOutsideVisibleBounds={true}
            animate={true}
          >
            <StartEndMarkers key="startEndMarkers" />
            <TIPLOCMarkers key="tiplocMarkers" />
            <StationMarker key="stationMarkers" />
          </MarkerClusterGroup>
          <TrainMarker key={"trainMarker"} />
          {plotPointsState.length !== 0 && trackedRoutes.length !== 0
            ? setRouteComponent()
            : null}
        </MapContainer>
      </div>
    </>
  );
});

export default Map;

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import stationIcon from "../assets/icons/trainStation.png";

// Hooks
import { useTheme } from "../hooks/ThemeHooks";
import { UseSelectedTiploc } from "../hooks/SelectedTiplocHook";

// Cookies
import Cookies from "js-cookie";

const Map = () => {
  const { selectedTiploc, setSelectedTiploc } = UseSelectedTiploc();
  const { theme: themeFromHook } = useTheme();

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

  useEffect(() => {
    console.log("Selected tiploiuihwuithturiewheuiohuiyuiuic", selectedTiploc); 
    if (selectedTiploc.length > 0) {
      selectedTiploc.forEach(tiploc => {
        coordinates.push([tiploc.latitude, tiploc.longitude]);
        console.log("Coordinates", coordinates);  
        // var retrievedObject = JSON.parse(Cookies.get(cookieName));
      });
    }
  }, [selectedTiploc]);

  const coordinates = [
    // [54.091617, -1.793925],
    // [51.5074, -0.1278],
  ]

  const mapThemes = {
    1: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    2: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
    3: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

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
            url={mapThemes[theme] || 'https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}'}
          />
          {coordinates.map((coordinate, index) => (
            <Marker key={index} position={coordinate} icon={trainStationIcon} />
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

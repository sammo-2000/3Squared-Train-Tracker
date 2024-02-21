import { useState, createContext } from "react";
import { notification } from "antd";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

const defaultSettings = {
  defaultZoom: 6,
  inspectZoom: 12,
  superZoom: 16,
  defaultCenter: { Latitude: 53.8008, Longitude: -1.5491 },
  zoomControlsPosition: {
    label: "Bottom Left",
    key: "3",
    value: "bottomleft",
  },
  mapTheme: {
    label: "Light Theme",
    key: "2",
    url: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  },
  pagination: {
    label: "100 Items - Medium Performance",
    key: "2",
    value: 100,
  },
  menuDirection: {
    label: "Left Aligned",
    key: "1",
    value: "left",
  },
  notifications: [
    "showRecents",
    "showRoutesLoading",
    "showLocationLoaded",
    "showLocationStopTrack",
  ],
};

import { useState, createContext } from "react";

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
  defaultCenter: { lat: 53.8008, lng: -1.5491 },
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
};

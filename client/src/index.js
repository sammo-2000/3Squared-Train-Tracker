import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/tailwind.css";

// Hooks
import { TrackedLocationsProvider } from "./contexts/TrackedLocationsContext.js";
import { TrackedRoutesProvider } from "./contexts/TrackedRoutesContext.js";
import { RoutesProvider } from "./contexts/RoutesContext.js";
import { SettingsProvider } from "./contexts/SettingsContext";
import { FilterProvider } from "./contexts/FilterContext";
import { MapProvider } from "./contexts/MapContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TrackedRoutesProvider>
      <RoutesProvider>
        <TrackedLocationsProvider>
          <SettingsProvider>
            <FilterProvider>
              <MapProvider>
                <App />
              </MapProvider>
            </FilterProvider>
          </SettingsProvider>
        </TrackedLocationsProvider>
      </RoutesProvider>
    </TrackedRoutesProvider>
  </React.StrictMode>
);

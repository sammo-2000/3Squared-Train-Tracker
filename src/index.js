import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/tailwind.css";

// Hooks
import { SelectedTiplocProvider } from "./contexts/SelectedTiplocContext.js";
import { TrainDetailProvider } from "./contexts/TrainDetailContext.js";
import { TiplocDetailProvider } from "./contexts/TiplocDetailContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TiplocDetailProvider>
      <TrainDetailProvider>
        <SelectedTiplocProvider>
          <App />
        </SelectedTiplocProvider>
      </TrainDetailProvider>
    </TiplocDetailProvider>
  </React.StrictMode>
);

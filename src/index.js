import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/tailwind.css";

// Hooks
import { FavTrainProvider } from "./contexts/FavTrainContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FavTrainProvider>
      <App />
    </FavTrainProvider>
  </React.StrictMode>
);

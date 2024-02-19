import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/tailwind.css";

// Hooks
import { SelectedTiplocProvider } from "./contexts/SelectedTiplocContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SelectedTiplocProvider>
      <App />
    </SelectedTiplocProvider>
  </React.StrictMode>
);

import React, { useEffect } from "react";

// Component
import Map from "./components/Map";

// Context
import { UseSelectedTiploc } from "./hooks/SelectedTiplocHook.js";

const App = () => {
  const { setSelectedTiploc } = UseSelectedTiploc();

  useEffect(() => {
    setSelectedTiploc([{ id: "123", title: "LEEDS", tiploc: "LEEDS" }]);
  }, [setSelectedTiploc]);

  return (
    <>
      <Map />
    </>
  );
};

export default App;

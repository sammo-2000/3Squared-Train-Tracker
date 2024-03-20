import React, { useState, useEffect, useRef } from "react";

// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Storage from "./components/Storage";
import Socket from "./Socket";

// Tour
import Guide from "./components/Guide";

// Contexts
import { MapContext } from "./contexts/MapContext";

const App = () => {
  // States
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(null);

  // Tour References
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  return (
    <>
      <Socket />
      <MapContext.Provider value={{ map, setMap }}>
        <Map setOpen={setOpen} />
        <Navbar ref1={ref1} ref2={ref2} ref3={ref3} ref4={ref4} />
      </MapContext.Provider>
      <Guide open={open} setOpen={setOpen} refs={[ref1, ref2, ref3, ref4]} />
      <Storage />
    </>
  );
};

export default App;

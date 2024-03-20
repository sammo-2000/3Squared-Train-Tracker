import React, { useState, useEffect, useRef } from "react";

// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Storage from "./components/Storage";
import Socket from "./Socket";

// Tour
import Guide from "./components/Guide";

// Cookies
import Cookies from "js-cookie";

// Contexts
import { MapContext } from "./contexts/MapContext";

const App = () => {
  // States
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(null);
  // const [autoTour, setAutoTour] = useState(true);
  const [autoTour, setAutoTour] = useState(Cookies.get("tour") !== "false");

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
        <Navbar
          ref1={ref1}
          ref2={ref2}
          ref3={ref3}
          ref4={ref4}
          setOpenGuide={setOpen}
          autoTour={autoTour}
          setAutoTour={setAutoTour}
        />
      </MapContext.Provider>
      <Guide
        open={open}
        setOpen={setOpen}
        refs={[ref1, ref2, ref3, ref4]}
        autoTour={autoTour}
        setAutoTour={setAutoTour}
      />
      <Storage />
    </>
  );
};

export default App;

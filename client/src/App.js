import React, { useState, useEffect, useRef } from "react";

// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Storage from "./components/Storage";
import Socket from "./Socket";

// Tour
import Guide from "./components/Guide";

const App = () => {
  // Tour State
  const [open, setOpen] = useState(false);

  // Tour References
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  return (
    <>
      <Socket />
      <Map setOpen={setOpen} ref4={ref4} />
      <Guide open={open} setOpen={setOpen} refs={[ref1, ref2, ref3]} />
      <Navbar ref1={ref1} ref2={ref2} ref3={ref3} />
      <Storage />
    </>
  );
};

export default App;

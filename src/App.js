import React from "react";
import Settings from "./components/Settings";

// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <>
      <Map />
      <Navbar />
      <Settings />
      <Map />
    </>
  );
};

export default App;

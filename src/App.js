import React, { useState, useEffect } from "react";

// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import GetTiplocs from "./components/cookies/GetTiplocs";

// import APIUsageExample from "./APIUsageExample";
import APIUsageExample from "./APIUsageExample";

const App = () => {
  return (
    <>
      {/* Turn this on for testing API usage */}
      <APIUsageExample />
      <Map />
      <Navbar />
      {/* <GetTiplocs /> */}
    </>
  );
};

export default App;

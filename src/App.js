import React from "react";

// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      {/* Turn this on for testing API usage */}
      {/* <APIUsageExample /> */}
      <Map />
      <Navbar />
    </>
  );
};

export default App;

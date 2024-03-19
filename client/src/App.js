import React, { useState, useEffect } from "react";
// Component
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Storage from "./components/Storage";
import Socket from "./Socket";

const App = () => {
  return (
    <>
      <Socket />
      <Map />
      <Navbar />
      <Storage />
    </>
  );
};

export default App;

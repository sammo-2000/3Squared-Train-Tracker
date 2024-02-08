import React from "react";
import Map from "./components/Map";
import "./css/tailwind.css";
import Search from "./components/Search";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Search />
      <Map />
    </div>
  );
}

export default App;

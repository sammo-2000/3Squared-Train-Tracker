import React from "react";
import Map from "./components/Map";
import "./css/tailwind.css";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Nav from "./components/Nav";
import { FloatButton } from "antd";

function App() {
  return (
    <div>
      {/* <Search /> */}
      <Map /> 
      <Nav />
    </div>
  );
}

export default App;

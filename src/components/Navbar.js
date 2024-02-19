import React, { useEffect, useState } from "react";

import location from "../assets/location.svg";
import route from "../assets/route.svg";
import train from "../assets/train.svg";

import Locations from "./drawers/Locations";
import Trains from "./drawers/Trains";
import Routes from "./drawers/Routes";

import Settings from "../components/Settings";

function Navbar() {
  const [activeDrawer, setActiveDrawer] = useState(null);

  return (
    <div>
      {activeDrawer === "locations" && (
        <Locations setActiveDraw={setActiveDrawer} />
      )}
      {activeDrawer === "trains" && (
        <Trains setActiveDraw={setActiveDrawer} />
      )}
      {activeDrawer === "routes" && (
        <Routes setActiveDraw={setActiveDrawer} />
      )}

      <div className="">
        <div className="absolute top-[5.5rem] left-0 flex-col text-center z-[1000] m-3 rounded-xl bg-white border-2 border-gray-200 overflow-hidden divide-y-2 divide-gray-200">
          <div
            key={0}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer text-gray-700"
            onClick={() => setActiveDrawer("locations")}
          >
            <img style={{ width: "2rem" }} src={location} alt={`Icon ${0}`} />
            <span className="text-gray-700">Locations</span>
          </div>
          <div
            key={1}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer"
            onClick={() => setActiveDrawer("trains")}
          >
            <img style={{ width: "2rem" }} src={train} alt={`Icon ${1}`} />
            <span>Trains</span>
          </div>
          <div
            key={2}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer"
            onClick={() => setActiveDrawer("routes")}
            >
            <img style={{ width: "2rem" }} src={route} alt={`Icon ${1}`} />
            <span>Routes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

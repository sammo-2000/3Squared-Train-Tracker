import React, { useEffect, useState } from "react";

import location from "../assets/location.svg";
import route from "../assets/route.svg";
import train from "../assets/train.svg";

import Locations from "./drawers/Locations";
import Trains from "./drawers/Trains";

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

      <div className="shadow-box">
        <div
          className="absolute top-[5.5rem] left-0 w-[4%] h-1/1 flex-col text-center z-[1000] m-3 rounded-lg overflow-hidden shadow-box"
          style={{
            backgroundColor: "#fff",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <div
            key={0}
            className="hover:bg-[#D8D8D8] rounded-lg max-h-12 flex justify-center w-[90%] mx-[5%] m-4"
            onClick={() => setActiveDrawer("locations")}
          >
            <img className="max-h-12" src={location} alt={`Icon ${0}`} />
          </div>
          <div
            key={1}
            className="hover:bg-[#D8D8D8] rounded-lg max-h-12 flex justify-center w-[90%] mx-[5%] m-4"
            onClick={() => setActiveDrawer("trains")}
          >
            <img className="max-h-12" src={location} alt={`Icon ${1}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

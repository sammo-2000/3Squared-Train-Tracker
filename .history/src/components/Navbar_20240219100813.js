import React, { useEffect, useState } from "react";

import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";

function Navbar() {
  const [activeDrawer, setActiveDrawer] = useState(null);

  useEffect(() => {
    // Switch case for active drawer
    console.log("")
  });

  return (
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
          <img className="max-h-12" src={icon1} alt={`Icon ${0}`} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

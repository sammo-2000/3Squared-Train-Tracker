import React, { useEffect } from "react";

// API
import { tiplocAPI } from "./api/data.js";

// Component
import Map from "./components/Map";

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const data = await tiplocAPI(["LEEDS"], "2024-02-18", "2024-02-20");
      console.log(data);
    };

    getData();
  }, []);

  return (
    <>
      <Map />
    </>
  );
};

export default App;

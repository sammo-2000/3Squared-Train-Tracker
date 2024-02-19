import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Hooks
import { useFavTrain } from "./hooks/FavTrainHook.js";

// API
import { tiplocAPI } from "./api/data.js";

// Component
import Map from "./components/Map";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { setFavTrain } = useFavTrain();

  useEffect(() => {
    const getData = async () => {
      const data = await tiplocAPI(["LEEDS"], "2024-02-18", "2024-02-20");
      console.log(data);
      setLoading(false);
      setFavTrain(data);
    };

    getData();
  }, [setFavTrain]);

  return loading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <HashLoader color="#36d7b7" size={50} />
    </div>
  ) : (
    <Map />
  );
};

export default App;

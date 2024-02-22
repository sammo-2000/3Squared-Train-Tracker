import React, { useState } from "react";

// We import loading to display loading when data is being fetched from the API
import Loading from "./components/Loading";

// Import hooks to use them globally
import { UseTrackedLocations } from "./hooks/TrackedLocationsHook";
import { UseRoutes } from "./hooks/RoutesHook";
import { UseTrackedRoutes } from "./hooks/TrackedRoutesHook";

// Import API to use them in functions
import { tiplocAPI } from "./api/tiplocAPI";
import { detailAPI } from "./api/detailAPI";

const APIUsageExample = () => {
  // Define the context to use
  const { trackedLocations, setTrackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();
  const [loading, setLoading] = useState(false);

  // Only run this once after setTrackedLocations is loaded
  // useEffect(() => {
  //   // Add the tiploc into selected tiploc
  //   // Normally this should be dynamic, currently hard coded as this is example
  //   setTrackedLocations(tiploc);
  // }, [setTrackedLocations]);

  // Function to get tiploc details
  const fetchTiplocDetails = async () => {
    // We set the tiploc data from the details return in functions
    // The functions should be await as data can take some time to load
    // We toggle the loading when fetching the data so the user know it is loading trying to fix
    setLoading(true);
    setRoutes(await tiplocAPI(trackedLocations));
    setLoading(false);
  };
  // Function to get train details
  const fetchTrainDetails = async () => {
    // We set the train data from the details return in functions
    // The functions should be await as data can take some time to load
    // We toggle the loading when fetching the data so the user know it is loading trying to fix
    setLoading(true);
    setTrackedRoutes(await detailAPI(trackedLocations));
    setLoading(false);
  };

  // Function to console log the contexts to see the results
  const logDetails = () => {
    console.log("-------------------------");
    console.log("Selected tiploc");
    console.log(trackedLocations);
    console.log("Tiploc detail");
    console.log(routes);
    console.log("Train detail");
    console.log(trackedRoutes);
  };

  // We return loading component when loading is true otherwise what ever we want to return
  return loading ? (
    <Loading />
  ) : (
    <>
      <button
        className="bg-black pl-[50px] text-white m-5 p-5"
        onClick={logDetails}
      >
        Log Details
      </button>
      <button
        className="bg-black text-white m-5 p-5"
        onClick={fetchTiplocDetails}
      >
        Fetch Tiploc Details
      </button>
      <button
        className="bg-black text-white m-5 p-5"
        onClick={fetchTrainDetails}
      >
        Fetch Train Details
      </button>
    </>
  );
};

export default APIUsageExample;

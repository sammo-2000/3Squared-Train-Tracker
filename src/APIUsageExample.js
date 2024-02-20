import React, { useState, useEffect } from "react";

// We import loading to display loading when data is being fetched from the API
import Loading from "./components/Loading";

// Import hooks to use them globally
import { UseSelectedTiploc } from "./hooks/SelectedTiplocHook";
import { UseTiplocDetail } from "./hooks/TiplocDetailHook";
import { UseTrainDetail } from "./hooks/TrainDetailHook";

// Import API to use them in functions
import { tiplocAPI } from "./api/tiplocAPI";
import { detailAPI } from "./api/detailAPI";

// This is hard coded for now as we don't have dynamic data to give
const tiploc = [
  {
    name: "Leeds",
    tiploc: "LEEDS",
  },
  {
    name: "York",
    tiploc: "YORK",
  },
];

const APIUsageExample = () => {
  // Define the context to use
  const { selectedTiploc, setSelectedTiploc } = UseSelectedTiploc();
  const { tiplocDetail, setTiplocDetail } = UseTiplocDetail();
  const { trainDetail, setTrainDetail } = UseTrainDetail();
  const [loading, setLoading] = useState(false);

  // Only run this once after setSelectedTiploc is loaded
  useEffect(() => {
    // Add the tiploc into selected tiploc
    // Normally this should be dynamic, currently hard coded as this is example
    setSelectedTiploc(tiploc);
  }, [setSelectedTiploc]);

  // Function to get tiploc details
  const fetchTiplocDetails = async () => {
    // We set the tiploc data from the details return in functions
    // The functions should be await as data can take some time to load
    // We toggle the loading when fetching the data so the user know it is loading trying to fix
    setLoading(true);
    setTiplocDetail(await tiplocAPI(selectedTiploc));
    setLoading(false);
  };
  // Function to get train details
  const fetchTrainDetails = async () => {
    // We set the train data from the details return in functions
    // The functions should be await as data can take some time to load
    // We toggle the loading when fetching the data so the user know it is loading trying to fix
    setLoading(true);
    setTrainDetail(await detailAPI(tiplocDetail));
    setLoading(false);
  };

  // Function to console log the contexts to see the results
  const logDetails = () => {
    console.log("-------------------------");
    console.log("Selected tiploc");
    console.log(selectedTiploc);
    console.log("Tiploc detail");
    console.log(tiplocDetail);
    console.log("Train detail");
    console.log(trainDetail);
  };

  // We return loading component when loading is true otherwise what ever we want to return
  return loading ? (
    <Loading />
  ) : (
    <>
      <button className="bg-black text-white m-5 p-5" onClick={logDetails}>
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

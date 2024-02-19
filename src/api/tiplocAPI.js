const tiplocAPI = async (selectedTiploc) => {
  // Set default dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Create array from tiploc objects with , as separator
  const tiplocString = selectedTiploc.map((tiploc) => tiploc.tiploc).join(",");

  // Call API
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/trains/tiploc/${tiplocString}/${
    yesterday.toISOString().split("T")[0]
  }/${tomorrow.toISOString().split("T")[0]}`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const tiplocData = await response.json();
  return tiplocData;
};

export { tiplocAPI };

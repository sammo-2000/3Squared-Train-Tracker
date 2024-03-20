// This function expect arrays of tiplocs and return full details about the tiploc
// It will return data from yesterday until tomorrow if available
async function getTiplocData(tiplocsArray) {
  // Define the data for yesterday and tomorrow
  const today = new Date();
  const yesterday = new Date(today);
  yesterday
    .setDate(yesterday.getDate() - 1)
    .toISOString()
    .split("T")[0];
  const tomorrow = new Date(today);
  tomorrow
    .setDate(tomorrow.getDate() + 1)
    .toISOString()
    .split("T")[0];

  // Create array from tiploc objects with , as separator
  const tiplocString = tiplocsArray.map((tiploc) => tiploc.Tiploc).join(",");

  // Call 3Squared API
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/trains/tiploc/${tiplocString}/${today}/${tomorrow}`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const tiplocData = await response.json();
  return tiplocData;
}

module.exports = getTiplocData;

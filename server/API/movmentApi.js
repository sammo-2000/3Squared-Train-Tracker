async function getMovmentData(activationId, scheduleId) {
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/ifmtrains/movement/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
}

module.exports = getMovmentData;

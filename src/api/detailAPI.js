// Use this function to get full details about the train
// You must pass in TiplocDetailContext as an argument
// You will get array of object that contain tiploc, movment and schedule information
// Save this details in TrainDetailContext

const detailAPI = async (TiplocDetailContext) => {
  let data = [];

  await Promise.all(
    TiplocDetailContext.map(async (element) => {
      const movment = await getMovementData(
        element.activationId,
        element.scheduleId
      );
      const schedule = await getScheduleData(
        element.activationId,
        element.scheduleId
      );

      data.push({ tiploc: element, movment, schedule });
    })
  );

  return data;
};

const getMovementData = async (activationId, scheduleId) => {
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/ifmtrains/movement/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
};

const getScheduleData = async (activationId, scheduleId) => {
  const apiEndPoint = `https://traindata-stag-api.railsmart.io/api/ifmtrains/schedule/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
};

export { detailAPI };

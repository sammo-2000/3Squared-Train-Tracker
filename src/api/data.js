const tiplocAPI = async (tiplocs, startDate, endDate) => {
  const baseAPI = "https://traindata-stag-api.railsmart.io/api";

  // Check data
  const tiploc = checkData(tiplocs, startDate, endDate);

  // Call tiploc API
  const apiEndPoint = `${baseAPI}/trains/tiploc/${tiploc}/${startDate} 00:00:00/${endDate} 23:59:59`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const tiplocData = await response.json();

  // Array to store data about train
  let data = [];

  // Get train movment and schedule data
  let i = 0;
  await Promise.all(
    tiplocData.map(async (element) => {
      if (element.cancelled) return;
      if (i !== 0) return;
      i++;

      const movment = await getMovementData(
        element.activationId,
        element.scheduleId,
        baseAPI
      );
      const schedule = await getScheduleData(
        element.activationId,
        element.scheduleId,
        baseAPI
      );

      data.push({ tiploc: element, movment, schedule });
    })
  );

  return data;
};

// Function to get train movement data
const getMovementData = async (activationId, scheduleId, baseAPI) => {
  // Call movment API
  const apiEndPoint = `${baseAPI}/ifmtrains/movement/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
};

// Function to get train schedule data
const getScheduleData = async (activationId, scheduleId, baseAPI) => {
  // Call movment API
  const apiEndPoint = `${baseAPI}/ifmtrains/schedule/${activationId}/${scheduleId}/`;
  const response = await fetch(apiEndPoint, {
    headers: {
      "X-ApiKey": process.env.REACT_APP_3SQUARED_API_KEY,
      "X-ApiVersion": "1.0",
    },
  });
  const movmentData = await response.json();
  return movmentData;
};

const checkData = (tiplocs, startDate, endDate) => {
  // Check if tiplocs is an array
  if (!Array.isArray(tiplocs)) throw new Error("tiplocs must be an array");

  // Date must be in the format "YYYY-MM-DD"
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate) || !dateRegex.test(endDate))
    throw new Error("Date must be in the format 'YYYY-MM-DD'");

  // Check tiploc is not empty
  if (tiplocs.length === 0) throw new Error("tiplocs cannot be empty");

  // Tiplocs turn into string with , as separator
  const tiplocString = tiplocs.join(",");
  return tiplocString;
};

export { tiplocAPI };

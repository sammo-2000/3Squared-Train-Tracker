export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const displayDot = (filter) => {
  if (filter !== undefined) {
    const s = filter.selected.location;
    const l = filter.options.location;
    return (
      s.stationType.length !== l.stationType.length ||
      s.distance.length !== l.distance.length ||
      s.category.length !== l.category.length ||
      s.availability.key !== l.availability[0].key ||
      s.timingPoint.length !== l.timingPoint.length
    );
  }
};

// Filter locations based on search text
export const searchFilterLocations = (item, searchText) => {
  return (
    item.DisplayName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Tiploc.toLowerCase().includes(searchText.toLowerCase())
  );
};

// Filter locations based on in use locations
export const inUseFilterLocations = (item, trackedLocations) => {
  if (trackedLocations === undefined) return true;
  return !trackedLocations.some(
    (trackedItem) => trackedItem.Tiploc === item.Tiploc
  );
};

// Sort locations (based on search text match and length difference)
export const sortLocations = (a, b, searchText) => {
  const aMatches = Array.from(a.Tiploc.toLowerCase()).filter((char) =>
    searchText.toLowerCase().includes(char)
  ).length;
  const bMatches = Array.from(b.Tiploc.toLowerCase()).filter((char) =>
    searchText.toLowerCase().includes(char)
  ).length;

  const aLengthDifference = Math.abs(a.Tiploc.length - searchText.length);
  const bLengthDifference = Math.abs(b.Tiploc.length - searchText.length);

  const aScore = aMatches - aLengthDifference;
  const bScore = bMatches - bLengthDifference;

  return bScore - aScore; // sort in descending order of score
};

// Filter locations based on filter options
export const optionsFilterLocations = (item, filter) => {
  // Off network filter
  if (
    item.Details.OffNetwork === false &&
    filter.selected.location.availability.value === "OfflineOnly"
  ) {
    return false;
  }

  if (
    item.Details.OffNetwork === true &&
    filter.selected.location.availability.value === "OnlineOnly"
  ) {
    return false;
  }

  // Station Type filter
  if (item.Details.hasOwnProperty("TPS_StationType")) {
    if (
      filter.selected.location.stationType
        .map((i) => {
          if (i.hasOwnProperty("value")) {
            return i.value;
          } else {
            return i;
          }
        })
        .includes(item.Details.TPS_StationType) === false
    ) {
      return false;
    }
  }

  // Station Category filter
  // item.Details.TPS_StationCategory
  if (item.Details.hasOwnProperty("TPS_StationCategory")) {
    if (
      filter.selected.location.category
        .map((i) => {
          if (i.hasOwnProperty("value")) {
            return i.value;
          } else {
            return i;
          }
        })
        .includes(item.Details.TPS_StationCategory) === false
    ) {
      return false;
    }
  }

  // Timing Point filter
  // item.Details.BPlan_TimingPoint
  if (
    item.Details.hasOwnProperty("BPlan_TimingPoint") &&
    item.Details.BPlan_TimingPoint !== null
  ) {
    if (
      filter.selected.location.timingPoint
        .map((i) => {
          if (i.hasOwnProperty("value")) {
            return i.value;
          } else {
            return i;
          }
        })
        .includes(item.Details.BPlan_TimingPoint) === false
    ) {
      return false;
    }
  }

  return true;
};

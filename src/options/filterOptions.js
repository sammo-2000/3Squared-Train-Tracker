export const availabilityItems = [
  {
    label: "Online & Offline",
    key: "1",
    value: "Online&Offline",
  },
  {
    label: "Online Only",
    key: "2",
    value: "OnlineOnly",
  },
  {
    label: "Offline Only",
    key: "3",
    value: "OfflineOnly",
  },
];

export const distanceOptions = {
  minDistance: 0,
  maxDistance: 500,
  selectedDistance: [0, 50],
};

export const stationTypeItems = [
  {
    label: "Optional Stop",
    key: "1",
    value: "OptionalStop",
  },
  {
    label: "Optional Crossing",
    key: "2",
    value: "OptionalCrossing",
  },
  {
    label: "Optional Freight",
    key: "3",
    value: "OptionalFreight",
  },
  {
    label: "Not Set",
    key: "4",
    value: "NotSet",
  },
  {
    label: "Mandatory TIPLOC",
    key: "5",
    value: "MandatoryTIPLOC",
  },
  {
    label: "Optional Stop Or Freight",
    key: "6",
    value: "OptionalStopOrFreight",
  },
  {
    label: "Optional Stop Or Crossing",
    key: "7",
    value: "OptionalStopOrCrossing",
  },
  {
    label: "Optional Passenger Or Crossing",
    key: "8",
    value: "OptionalPassengerOrCrossing",
  },
  {
    label: "Optional Passenger",
    key: "9",
    value: "OptionalPassenger",
  },
  {
    label: "Null",
    key: "10",
    value: "Null",
  },
  {
    label: "Optional Freight Or Crossing",
    key: "11",
    value: "Optional Freight Or Crossing",
  },
  {
    label: "Optional Stop Or Passenger",
    key: "12",
    value: "OptionalStopOrPassenger",
  },
  {
    label: "null",
    key: "13",
    value: "null",
  },
  {
    label: "Maintenance",
    key: "14",
    value: "Maintenance",
  },
  {
    label: "Extra Tiploc",
    key: "15",
    value: "ExtraTiploc",
  },
];

export const stationCategoryItems = [
  {
    label: "Engineering Location",
    key: "1",
    value: "EngineeringLocation",
  },
  {
    label: "Stopping Only",
    key: "2",
    value: "StoppingOnly",
  },
  {
    label: "Non Passenger Or Operational",
    key: "3",
    value: "NonPassengerOrOperational",
  },
  {
    label: "Not Set",
    key: "4",
    value: "NotSet",
  },
  {
    label: "Freight Yard",
    key: "5",
    value: "FreightYard",
  },
  {
    label: "Through Planning Location",
    key: "6",
    value: "ThroughPlanningLocation",
  },
  {
    label: "Non Passenger",
    key: "7",
    value: "NonPassenger",
  },
  {
    label: "Interchange Planning Location",
    key: "8",
    value: "InterchangePlanningLocation",
  },
  {
    label: "Routing Only",
    key: "9",
    value: "RoutingOnly",
  },
  {
    label: "Null",
    key: "10",
    value: "Null",
  },
  {
    label: "Crossing Only",
    key: "11",
    value: "CrossingOnly",
  },
  {
    label: "Network Boundary",
    key: "12",
    value: "NetworkBoundary",
  },
  {
    label: "Through Planning",
    key: "13",
    value: "ThroughPlanning",
  },
  {
    label: "null",
    key: "14",
    value: "null",
  },
  {
    label: "Interchange",
    key: "15",
    value: "Interchange",
  },
];

export const TimingPointOptions = [
  {
    label: "Optional",
    key: "1",
    value: "optional",
  },
  {
    label: "Trust",
    key: "2",
    value: "trust",
  },
  {
    label: "Mandatory",
    key: "3",
    value: "mandatory",
  },
  {
    label: "Unknown / Any",
    key: "4",
    value: "null",
  },
];

export const options = {
  location: {
    availability: availabilityItems,
    distance: distanceOptions,
    stationType: stationTypeItems,
    category: stationCategoryItems,
    timingPoint: TimingPointOptions,
  },
};

export const selected = {
  location: {
    availability: availabilityItems[0],
    distance: distanceOptions,
    stationType: stationTypeItems,
    category: stationCategoryItems,
    timingPoint: TimingPointOptions,
  },
};

// Location filter options

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
    value: "Optional",
  },
  {
    label: "Trust",
    key: "2",
    value: "Trust",
  },
  {
    label: "Mandatory",
    key: "3",
    value: "Mandatory",
  },
];

// Routes filter options

export const lastReportedTypeOptions = [
  {
    label: "Activated",
    key: "1",
    value: "ACTIVATED",
  },
  {
    label: "Arrival",
    key: "2",
    value: "ARRIVAL",
  },
  {
    label: "Departure",
    key: "3",
    value: "DEPARTURE",
  },
  {
    label: "Terminated",
    key: "4",
    value: "TERMINATED",
  },
  {
    label: "Cancelled",
    key: "5",
    value: "CANCELLED",
  },
];

export const offRouteOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Off Route Only",
    key: "2",
    value: true,
  },
  {
    label: "Not Off Route Only",
    key: "3",
    value: false,
  },
];

export const trainCancelledOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Cancelled",
    key: "2",
    value: true,
  },
  {
    label: "Not Cancelled",
    key: "3",
    value: false,
  },
];

export const trainCancelledEnRoutesOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Cancelled En Route",
    key: "2",
    value: true,
  },
  {
    label: "Still on Route",
    key: "3",
    value: false,
  },
];

export const trainCancelledImmediatelyOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Cancelled Immediately",
    key: "2",
    value: true,
  },
  {
    label: "Running",
    key: "3",
    value: false,
  },
];

export const trainCancelledOutOfPlanOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Cancelled Out Of Plan",
    key: "2",
    value: true,
  },
  {
    label: "Planned",
    key: "3",
    value: false,
  },
];

export const trainShouldHaveDepartedExceptionOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Should Have Departed Exception",
    key: "2",
    value: true,
  },
  {
    label: "No Exception",
    key: "3",
    value: false,
  },
];

export const scheduleHasScheduleOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Has Schedule",
    key: "2",
    value: true,
  },
  {
    label: "No Schedule",
    key: "3",
    value: false,
  },
];

export const scheduleCancelledOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Schedule Cancelled",
    key: "2",
    value: true,
  },
  {
    label: "Schedule Running",
    key: "3",
    value: false,
  },
];

export const scheduleJustForTodayOptions = [
  {
    label: "Any",
    key: "1",
    value: null,
  },
  {
    label: "Just For Today",
    key: "2",
    value: true,
  },
  {
    label: "For More Than Today",
    key: "3",
    value: false,
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
  routes: {
    lastReportedType: lastReportedTypeOptions,
    offRoute: offRouteOptions,
    train: {
      cancelled: trainCancelledOptions,
      cancelledEnRoutes: trainCancelledEnRoutesOptions,
      cancelledImmediately: trainCancelledImmediatelyOptions,
      cancelledOutOfPlan: trainCancelledOutOfPlanOptions,
      shouldHaveDepartedException: trainShouldHaveDepartedExceptionOptions,
    },
    schedule: {
      hasSchedule: scheduleHasScheduleOptions,
      scheduleCancelled: scheduleCancelledOptions,
      scheduleJustForToday: scheduleJustForTodayOptions,
    },
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
  routes: {
    lastReportedType: lastReportedTypeOptions,
    offRoute: offRouteOptions[0],
    train: {
      cancelled: trainCancelledOptions[0],
      cancelledEnRoutes: trainCancelledEnRoutesOptions[0],
      cancelledImmediately: trainCancelledImmediatelyOptions[0],
      cancelledOutOfPlan: trainCancelledOutOfPlanOptions[0],
      shouldHaveDepartedException: trainShouldHaveDepartedExceptionOptions[0],
    },
    schedule: {
      hasSchedule: scheduleHasScheduleOptions[0],
      scheduleCancelled: scheduleCancelledOptions[0],
      scheduleJustForToday: scheduleJustForTodayOptions[0],
    },
  },
};

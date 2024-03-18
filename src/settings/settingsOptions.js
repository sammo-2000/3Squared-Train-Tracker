export const defaultSettings = {
  defaultZoom: 6,
  inspectZoom: 12,
  superZoom: 16,
  defaultCenter: { Latitude: 54.45088, Longitude: -2.41332 },
  zoomControlsPosition: {
    label: "Bottom Left",
    key: "3",
    value: "bottomleft",
  },
  mapTheme: {
    label: "Light Theme",
    key: "2",
    url: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  },
  pagination: {
    label: "100 Items - Medium Performance",
    key: "2",
    value: 100,
  },
  menuDirection: {
    label: "Left Aligned",
    key: "1",
    value: "left",
  },
  notifications: [
    "showRecents",
    "showRoutesLoading",
    "showLocationLoaded",
    "showLocationStopTrack",
  ],
  menuAutoClose: {
    label: "Always",
    key: "1",
    value: true,
  },
  rails: {
    label: "Hide Rails",
    key: "0",
    // Null at start to make it hidden when first load
    url: "",
    // url: "http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
  },
};

export const menuAutoCloseItems = [
  {
    label: "Always",
    key: "1",
    value: true,
  },
  {
    label: "Never",
    key: "2",
    value: false,
  },
];

export const themeItems = [
  {
    label: "Dark Theme",
    key: "1",
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  },
  {
    label: "Light Theme",
    key: "2",
    url: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  },
  {
    label: "Realistic Theme",
    key: "3",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    label: "Clean Light Theme",
    key: "4",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  },
  {
    label: "Clean Dark Theme",
    key: "5",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  },
];

export const railsItems = [
  {
    label: "Hide Rails",
    key: "0",
    url: "",
  },
  {
    label: "Standard", // https://www.openrailwaymap.org/
    key: "1",
    url: "http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
  },
  {
    label: "Signals",
    key: "2",
    url: "http://{s}.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png",
  },
  {
    label: "Electrified",
    key: "3",
    url: "http://{s}.tiles.openrailwaymap.org/electrification/{z}/{x}/{y}.png",
  },
  {
    label: "Max Speed",
    key: "4",
    url: "http://{s}.tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png",
  },
  {
    label: "Gauge",
    key: "5",
    url: "http://{s}.tiles.openrailwaymap.org/gauge/{z}/{x}/{y}.png",
  },
];

export const zoomControlsPositionItems = [
  {
    label: "Top Left",
    key: "1",
    value: "topleft",
  },
  {
    label: "Top Right",
    key: "2",
    value: "topright",
  },
  {
    label: "Bottom Left",
    key: "3",
    value: "bottomleft",
  },
  {
    label: "Bottom Right",
    key: "4",
    value: "bottomright",
  },
];

export const paginationItems = [
  {
    label: "50 Items - Low Performance",
    key: "1",
    value: 50,
  },
  {
    label: "100 Items - Medium Performance",
    key: "2",
    value: 100,
  },
  {
    label: "250 Items - High Performance",
    key: "3",
    value: 250,
  },
];

export const menuDirectionItems = [
  {
    label: "Left Aligned",
    key: "1",
    value: "left",
  },
  {
    label: "Right Aligned",
    key: "2",
    value: "right",
  },
];

export const notificationsOptions = [
  {
    title: "Locations",
    value: "locations",
    key: "0",
    children: [
      {
        title: "A location added to recently used list notification",
        value: "showRecents",
        key: "0-0",
      },
      {
        title: "Loading routes from selected location notification",
        value: "showRoutesLoading",
        key: "0-1",
      },
      {
        title: "Locations loaded notification",
        value: "showLocationLoaded",
        key: "0-2",
      },
      {
        title: "Location removed from tracking notification",
        value: "showLocationStopTrack",
        key: "0-3",
      },
    ],
  },
];

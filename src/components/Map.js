// import React from "react";
// import { MapContainer } from "react-leaflet/MapContainer";
// import { TileLayer } from "react-leaflet/TileLayer";
// import "leaflet/dist/leaflet.css";
// import "../css/leaflet.css";
// import Marker from "./CustomMarker";

// const Map = () => {
//   return (
//     <div className="map">
//       <MapContainer
//         center={[54.091617, -1.793925]}
//         zoom={6}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           accessToken={process.env.REACT_APP_API_KEY}
//           url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
//         />
//         <Marker
//           Latitude={54.091617}
//           Longitude={-1.793925}
//           PopupContent={
//             <h1>
//               POPUP! <strong>Hello</strong>
//             </h1>
//           }
//         />
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;


import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import Marker from "./CustomMarker";
import Navbar from "./Navbar";
import Nav from "./Nav";
import { FloatButton } from 'antd';

const Map = () => {
  return (
    <div className="map-container" style={{ position: 'relative' }}>
      <MapContainer
        center={[54.091617, -1.793925]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          accessToken={process.env.REACT_APP_API_KEY}
          url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        />
        <Marker
          Latitude={54.091617}
          Longitude={-1.793925}
          PopupContent={
            <h1>
              POPUP! <strong>Hello</strong>
            </h1>
          }
        />
      </MapContainer>
      <Nav />
      <FloatButton onClick={() => map.panTo([50, 20])} />
    </div>
  );
  const map = useMap();
};

// style={{ // makes the div overlay the map
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '5%',
//   height: '100%',
//   backgroundColor: 'rgba(255,255,255,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   zIndex: 1000
// }}

export default Map;
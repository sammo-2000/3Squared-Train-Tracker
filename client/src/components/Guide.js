import React, { useEffect, useRef, useState } from "react";

// Ant Design
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tour } from "antd";

// Tour Assets
import tourImage1 from "../assets/images/TourImage1.png";
import tourImage2 from "../assets/images/TourImage2.png";
import tourImage3 from "../assets/images/TourImage3.png";
import tourGif from "../assets/gifs/TourGif4.gif";

// Cookies
import Cookies from "js-cookie";

const Guide = ({ open, setOpen, refs, autoTour }) => {
  // For auto loading the tour if it's your first time.

  const steps = [
    {
      title: "Locations",
      description:
        "This section will allow you to view and track all of the available TIPLOC Locations on the map. Tracking a location will then allow you to view all available routes to and from that location in the routes section.",
      cover: (
        <img
          alt="Image giving a brief overview of the locations section"
          src={tourImage1}
        />
      ),
      target: () => refs[0].current,
    },
    {
      title: "Routes",
      description:
        "The routes section will allow you to view and track all of the available routes based on your tracked locations. Tracking a route will then plot the route and it's schedule on the map. This section also provides a journey tracker for your to be able to view the progress of the train.",
      cover: (
        <img
          alt="Image giving a brief overview of the routes section"
          src={tourImage2}
        />
      ),
      target: () => refs[1].current,
    },
    {
      title: "Settings",
      description:
        "This is the settings section, here you can change the way the application looks and behaves to fit your own personal preferences.",
      cover: (
        <img
          alt="Image giving a brief overview of the settings section"
          src={tourImage3}
        />
      ),
      target: () => refs[2].current,
    },
    {
      title: "Recenter Map",
      description:
        "Incase you get lost, you can press the recenter button to reset the map back to it's original position.",
      cover: <img alt="Gif showing the map recentering" src={tourGif} />,
      target: () => refs[3].current,
    },
  ];

  return (
    <>
      <Tour
        open={open}
        onClose={() => {
          setOpen(false);
          Cookies.set("tour", false);
        }}
        steps={steps}
        setAutoTour={false}
      />
    </>
  );
};

export default Guide;

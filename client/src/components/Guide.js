import React, { useRef, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tour } from "antd";

import tourImage1 from "../assets/images/TourImage1.png";
import tourImage2 from "../assets/images/TourImage1.png";
import tourImage3 from "../assets/images/TourImage1.png";
import tourGif from "../assets/gifs/TourGif4.gif";

const Guide = ({ open, setOpen, refs }) => {
  console.log(refs);
  const steps = [
    {
      title: "Upload File",
      description: "Put your files here.",
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => refs[0].current,
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => refs[1].current,
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
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
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default Guide;

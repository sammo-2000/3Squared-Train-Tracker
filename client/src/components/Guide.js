import React, { useRef, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tour } from "antd";

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
      title: "Final",
      description: "dddd other actions.",
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

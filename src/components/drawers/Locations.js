import { Drawer } from "antd";
import "../../css/drawer.css";
import { useState } from "react";

const Locations = (props) => {
  return (
    <>
      <Drawer
        title="Basic Drawer"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={true}
        placement="left"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Locations;

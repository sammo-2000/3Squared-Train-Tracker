import { Drawer } from "antd";
import "../../css/drawer.css";
import { useState } from "react";

const Routes = (props) => {
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
        <h1>Tracked Routes</h1>

        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Routes;

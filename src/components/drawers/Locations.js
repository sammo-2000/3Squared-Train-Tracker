import { Drawer, Space, Button } from "antd";
import "../../css/drawer.css";
import { useState } from "react";
import add from "../../assets/add.svg";
import back from "../../assets/back.svg";

const Locations = (props) => {
  return (
    <>
      <Drawer
        title="Tracked Locations"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={true}
        placement="left"
        closeIcon={<img src={back} />}
        extra={
          <Space>
            <Button
              onClick={null}
              shape="circle"
              type="primary"
              ghost
              icon={<img src={add} />}
            ></Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Locations;

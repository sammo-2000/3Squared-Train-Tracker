import { Drawer } from 'antd'
import { useState} from 'react';
import "../../css/drawer.css";

const Trains = (props) => {
    return (
      <>
        <Drawer
          title="Trains"
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

export default Trains;
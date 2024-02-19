import { Drawer } from 'antd'
import { useState} from 'react';

const Trains = (props) => {
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
};

export default Trains;
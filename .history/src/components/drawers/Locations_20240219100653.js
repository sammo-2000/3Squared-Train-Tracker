import { Button, Drawer } from 'antd';

const Locations = (prop) => {
  return (
    <>
      <Drawer title="Basic Drawer" onClose={props.onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Locations;

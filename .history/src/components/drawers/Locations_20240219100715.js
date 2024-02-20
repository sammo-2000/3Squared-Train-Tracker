import { Drawer } from "antd";

const Locations = (props) => {
  return (
    <>
      <Drawer title="Basic Drawer" onClose={props.onClose} open={props.open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Locations;

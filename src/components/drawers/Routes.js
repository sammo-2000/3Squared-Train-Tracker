import { Drawer, Space, Button } from "antd";
import "../../css/drawer.css";
import { useState } from "react";
import add from "../../assets/add.svg";
import back from "../../assets/back.svg";

const Routes = (props) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const showOverlay = () => {
    setOverlayVisible(true);
  };

  const hideOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <>
      <Drawer
        title="Tracked Routes"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        visible={true}
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
        
      </Drawer>

      
      <Drawer
        title="Routes"
        placement="left"
        closable={true}
        onClose={hideOverlay}
        visible={overlayVisible}
        width={400}
      >
        <h1>Trains</h1>
        
      </Drawer>
    </>
  );
};

export default Routes;
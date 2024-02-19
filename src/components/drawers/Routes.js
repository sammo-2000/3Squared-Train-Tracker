import { Drawer, Button, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../css/drawer.css";
import { useState } from "react";

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
      >
        <h1>Tracked Routes</h1>
        <div className="overlayOpen"><Space style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={showOverlay} icon={<PlusOutlined />} />
        </Space>
        </div>
        <Input.Search placeholder="Search" />
        
      </Drawer>

      //Add Trains overlay
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
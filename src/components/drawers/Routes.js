import { Drawer, Space, Button, Empty, Input, Badge, Tabs } from "antd";
import { useState } from "react";

import add from "../../assets/add.svg";
import back from "../../assets/back.svg";
import mapEmpty from "../../assets/map-empty.svg";

const { TabPane } = Tabs;


const Routes = (props) => {
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const totalCount = 10;

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  return (
    <>
      <Drawer
        title="Tracked Routes"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={true}
        placement="left"
        closeIcon={<img src={back} />}
        extra={
          <Space>
            <Button
              onClick={showChildrenDrawer}
              shape="circle"
              type="primary"
              ghost
              icon={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5rem"
                    height="1.5rem"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M450.001-450.001h-200q-12.75 0-21.375-8.628-8.625-8.629-8.625-21.384 0-12.756 8.625-21.371 8.625-8.615 21.375-8.615h200v-200q0-12.75 8.628-21.375 8.629-8.625 21.384-8.625 12.756 0 21.371 8.625 8.615 8.625 8.615 21.375v200h200q12.75 0 21.375 8.628 8.625 8.629 8.625 21.384 0 12.756-8.625 21.371-8.625 8.615-21.375 8.615h-200v200q0 12.75-8.628 21.375-8.629 8.625-21.384 8.625-12.756 0-21.371-8.625-8.615-8.625-8.615-21.375v-200Z" />
                  </svg>
                </>
              }
            ></Button>
          </Space>
        }
      >
        <Empty
          image={mapEmpty}
          imageStyle={{
            height: 60,
            alignSelf: "center",
            display: "inline-block",
          }}
          description={
            <span className="font-semibold">
              You have no Routes tracked.
            </span>
          }
        ></Empty>
      </Drawer>

      <Drawer
        title="Routes"
        width={320}
        closable={false}
        onClose={onChildrenDrawerClose}
        open={childrenDrawer}
        placement="left"
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button type="primary">Cancel</Button>
              <Button type="primary" onClick={() => console.log("Add Route")}>Add Route</Button>
            </Space>
          </div>
        }
      >
        <Input
          placeholder="Route"
          onSearch={() => console.log("search")}
        />
        <div style={{ marginTop: '10px' }}>
          <Tabs defaultActiveKey="all">
          <TabPane
              tab={
                <Badge count={totalCount} style={{ backgroundColor: '#52c41a', display: 'inline-block', marginLeft: '16px' }}>
                  <span style={{ color: 'black' }}>All</span>
                </Badge> 
              }
              
            >
            
            </TabPane>
          </Tabs>
        </div>
      </Drawer>
    </>
  );
};

export default Routes;

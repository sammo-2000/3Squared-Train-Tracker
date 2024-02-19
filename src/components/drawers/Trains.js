import {
  Drawer,
  Space,
  Button,
  Empty,
  Input,
  Tabs,
  List,
  Popconfirm,
} from "antd";
import { useState } from "react";
import search from "../../assets/search.svg";
import add from "../../assets/add.svg";
import back from "../../assets/back.svg";
import train from "../../assets/train.svg";
import lightbulb from "../../assets/lightbulb.svg";

const Trains = (props) => {
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const totalCount = 10;

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const data = [
    {
      Headcode: "5N09",
      StartTIPLOC: "FRMPKRS",
      EndTIPLOC: "KNGX",
      tracked: true,
    }
    
  ];

  return (
    <>
      <Drawer
        title="Tracked Trains"
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
          image={train}
          imageStyle={{
            height: 60,
            alignSelf: "center",
            display: "inline-block",
          }}
          description={
            <span className="font-semibold">
              You have no Trains tracked.
            </span>
          }
        ></Empty>
      </Drawer>

      <Drawer
          title="Track New Train"
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          placement="left"
          closeIcon={<img alt="back" className="rotate-180" src={back} />}
          bodyStyle={{ padding: 0 }}
        >
          <Input
            placeholder="Search Headcodes"
            allowClear
            size="large"
            prefix={
              <img
                style={{
                  padding: "0px 0.5rem",
                  opacity: "50%",
                }}
                alt="search"
                src={search}
              />
            }
            onSearch={() => console.log("search")}
            style={{
              borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
              marginTop: "-1px",
              borderRight: "none",
              borderLeft: "none",
              borderRadius: "0",
              padding: "1rem 1rem",
            }}
          />

          <Tabs
            defaultActiveKey="0"
            tabBarStyle={{
              padding: ".5rem 2rem 0px 2rem",
              fontWeight: "500",
              marginBottom: "0px",
            }}
          >
            <Tabs.TabPane key={0} tab="All">
              <List
                size="large"
                dataSource={data}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track Train"
                    description="Are you sure you want to track this Train?"
                    onConfirm={null}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.Headcode}</div>
                      <div>{item.StartTIPLOC} --------- {item.EndTIPLOC}</div>                    
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              key={1}
              tab="Recently Used"
              style={{ padding: "0px 1rem" }}
            >
              <Empty
                image={lightbulb}
                imageStyle={{
                  height: 60,
                  alignSelf: "center",
                  display: "inline-block",
                  margin: "1rem",
                }}
                description={
                  <span className="font-semibold">
                    You have no recently used Trains.
                  </span>
                }
              ></Empty>
            </Tabs.TabPane>
          </Tabs>
        </Drawer>
    </>
  );
};

export default Trains;

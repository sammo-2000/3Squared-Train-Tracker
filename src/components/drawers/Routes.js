import {
  Drawer,
  Space,
  Button,
  Input,
  Tabs,
  List,
  Popconfirm,
  notification,
  message,
} from "antd";
import "../../css/drawer.css";
import { useState, useEffect } from "react";

import search from "../../assets/icons/search.svg";
import back from "../../assets/icons/back.svg";

import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";
import { UseRoutes } from "../../hooks/RoutesHook.js";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook.js";

import { tiplocAPI } from "../../api/tiplocAPI.js";
import { detailAPI } from "../../api/detailAPI.js";

const Routes = (props) => {
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  const { trackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(trackedLocations);
        // All routes information from the API
        const _routes = await tiplocAPI(trackedLocations);

        // Exit if not array
        if (!Array.isArray(_routes)) return;

        // Keep track of tracked routes ID & operators
        let _trackedRoutesID = [];
        let _trackedRoutesOperators = [];
        trackedRoutes.forEach((__trackedRoute) => {
          _trackedRoutesID.push(__trackedRoute.tiploc.activationId);
          _trackedRoutesOperators.push(__trackedRoute.tiploc.toc_Name);
        });

        // Filter routes to only include those that are not already tracked
        const _filteredRoutes = _routes.filter(
          (route) =>
            !_trackedRoutesID.includes(route.activationId) &&
            !_trackedRoutesOperators.includes(route.toc_Name)
        );

        // Set the routes to the filtered routes
        setRoutes(_filteredRoutes.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [trackedLocations, trackedRoutes]);

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onTrackedRouteClick = (item, e) => {
    if (e.key === "view-details") {
      console.log("View details");
      console.log(item);
    }

    if (e.key === "stop-tracking") {
      setTrackedRoutes(trackedRoutes.filter((i) => i !== item));

      message.success("Route removed from tracking.");
    }
  };

  const setTracked = (item) => {
    setChildrenDrawer(false);
    setSearchText("");
    setRecentlyUsed([...recentlyUsed, item]);
    setTrackedRoutes([...trackedRoutes, item]);

    notification.open({
      message: "Routes loading...",
      description:
        "Please wait while we load routes from your selected location. This may take a few seconds.",
      duration: 5,
    });

    if (recentlyUsed.length === 0) {
      notification.open({
        message: "Recently Used",
        description:
          "A location was added to your recently used list, you can disable this in settings.",
        duration: 5,
      });
    }
  };

  return (
    <>
      <Drawer
        title="Tracked Routes"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={props.isOpen}
        placement="left"
        closeIcon={<img alt="back" src={back} />}
        bodyStyle={{ padding: 0 }}
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
        <Input
          placeholder="Search Route"
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
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            marginTop: "-1px",
            borderRight: "none",
            borderLeft: "none",
            borderRadius: "0",
            padding: "1rem 1rem",
          }}
        />

        {/* <List
          size="large"
          dataSource={trackedRoutes.map((element) => ({
            title: `${element.schedule[0].tiploc} --- ${
              element.schedule[element.schedule.length - 1].tiploc
            }`,

            startLocation: `${element.schedule[0].location}`,
            endLocation: `${
              element.schedule[element.schedule.length - 1].location
            }`,
            departure: `${element.schedule[0].departure}`,
            arrival: `${element.schedule[element.schedule.length - 1].arrival}`,
          }))}
          style={{ size: "200px" }}
          renderItem={(item) => (
            <Popconfirm
              icon={null}
              title="Track Route"
              description="Are you sure you want to track this Route?"
              // onConfirm={}
              onCancel={null}
              okText="Yes"
              cancelText="No"
            >
              <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                <div style={{ fontSize: "18px", display: "block" }}>
                  <h2 style={{ fontWeight: "bold" }}>
                    {item.startLocation} ------- {item.endLocation}
                  </h2>
                  <div>Departure: {item.departure}</div>
                  <div>Arrival: {item.arrival}</div>
                </div>
              </List.Item>
            </Popconfirm>
          )}
        /> */}
        <Drawer
          title="Track New Route"
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          placement="left"
          closeIcon={<img alt="back" className="rotate-180" src={back} />}
          bodyStyle={{ padding: 0 }}
        >
          <Input
            placeholder="Search Routes"
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
            onChange={(e) => setSearchText(e.target.value)}
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
            {/* <Tabs.TabPane key={0} tab="All">
              <List
                size="large"
                dataSource={routes.map((element) => ({
                  title: `${element.schedule[0].tiploc} --- ${
                    element.schedule[element.schedule.length - 1].tiploc
                  }`,
                }))}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track Route"
                    description="Are you sure you want to track this Route?"
                    onConfirm={() => setTracked(item)}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.title}</div>
                      <div>{item.time}</div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane> */}
            <Tabs.TabPane key={1} tab="Recently Used">
              <List
                size="large"
                dataSource={recentlyUsed.filter((item) => {
                  return (
                    item.title
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) &&
                    !trackedRoutes.some(
                      (trackedItem) => trackedItem.id === item.id
                    )
                  );
                })}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track location"
                    description="Are you sure you want to track this route?"
                    onConfirm={() => setTracked(item)}
                    onCancel={() =>
                      setRecentlyUsed(recentlyUsed.filter((i) => i !== item))
                    }
                    okText="Yes"
                    cancelText="Remove from recently used"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.title}</div>
                      <div>{item.time}</div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
          </Tabs>
        </Drawer>
      </Drawer>
    </>
  );
};

export default Routes;

import {
  Drawer,
  Space,
  Button,
  Input,
  Tabs,
  List,
  Popconfirm,
  notification,
} from "antd";

import "../../css/drawer.css";
import { useEffect, useState } from "react";

import search from "../../assets/icons/search.svg";
import back from "../../assets/icons/back.svg";

import { UseSelectedTiploc } from "../../hooks/TrackedLocationsHook.js";
import { UseRoutes } from "../../hooks/RoutesHook.js";
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";

import { tiplocAPI } from "../../api/tiplocAPI.js";
import { detailAPI } from "../../api/detailAPI.js";

const Trains = (props) => {
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [trackedTrains, setTrackedTrains] = useState([]);
  const [notificationApi, notificationContext] = notification.useNotification();
  const { selectedTiploc } = UseSelectedTiploc();
  const { tiplocDetail, setTiplocDetail } = UseRoutes();
  const { trainDetail, setTrainDetail } = UseTrackedRoutes();
  const [emptyDetail, setEmptyDetail] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // All tiplocs
        const allTiplocs = await tiplocAPI(selectedTiploc);

        let _selectedTiplocs = [];
        trainDetail.forEach((element) => {
          _selectedTiplocs.push(element.tiploc.activationId);
        });

        const filteredTiploc = allTiplocs.filter(
          (element) => !_selectedTiplocs.includes(element.activationId)
        );

        setTiplocDetail(filteredTiploc.reverse());

        if (filteredTiploc.length > 0) {
          setEmptyDetail(false);
        }
      } catch (error) {}
    };

    fetchData();
  }, [selectedTiploc && setTiplocDetail, trainDetail]);

  const openLoadingNotification = () => {
    notificationApi.open({
      message: "Trains loading...",
      description:
        "Please wait while we load the route from your selected headcode. This may take a few seconds.",
      duration: 5,
    });
  };
  const duplicateTrainDetected = () => {
    notificationApi.open({
      message: "Headcode Already Added To Tracked Trains",
      duration: 5,
    });
  };

  const openRecentlyUsedNotification = () => {
    notificationApi.open({
      message: "Recently Used",
      description:
        "A location was added to your recently used list, you can disable this in settings.",
      duration: 5,
    });
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const setTracked = (item) => {
    // TODO: Need to make sure there isn't any duplicates
    const isItemAlreadyTracked = recentlyUsed.some(
      (trackedItem) => trackedItem.Headcode === item.Headcode
    );
    if (isItemAlreadyTracked) {
      duplicateTrainDetected();
      return;
    }

    setChildrenDrawer(false);
    setSearchText("");
    setRecentlyUsed([...recentlyUsed, item]);
    setTrackedTrains([...trackedTrains, item]);
    openLoadingNotification();

    if (recentlyUsed.length === 0) {
      openRecentlyUsedNotification();
    }
  };

  const data = [
    {
      Headcode: "5N09",
      StartTIPLOC: "FRMPKRS",
      EndTIPLOC: "KNGX",
      tracked: true,
    },
  ];

  return (
    <>
      {notificationContext}
      <Drawer
        title="Tracked Trains"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={true}
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
          placeholder="Search Headcode"
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

        {emptyDetail && (
          <List
            size="large"
            dataSource={trackedTrains.filter((item) => {
              return item.Headcode.toLowerCase().includes(
                searchText.toLowerCase()
              );
            })}
            renderItem={(item) => (
              <Popconfirm
                icon={null}
                title="Track Train"
                description="Are you sure you want to track this Train?"
                onConfirm={() => setTracked(item)}
                onCancel={null}
                okText="Yes"
                cancelText="No"
              >
                <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                  <div>{item.Headcode}</div>
                  <div>
                    {item.StartTIPLOC} --------- {item.EndTIPLOC}
                  </div>
                </List.Item>
              </Popconfirm>
            )}
          />
        )}
        {tiplocDetail && tiplocDetail.length > 0 && (
          <List
            size="large"
            dataSource={tiplocDetail}
            renderItem={(item) => (
              <List.Item
                className={`hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer ${
                  item.lastReportedType === "CANCELLED"
                    ? "bg-red-100 hover:bg-red-200"
                    : ""
                }
                ${
                  item.lastReportedType === "TERMINATED"
                    ? "bg-yellow-100 hover:bg-yellow-200"
                    : ""
                }`}
              >
                <button
                  className="flex flex-col gap-2 w-full items-start"
                  onClick={async () => {
                    let _trainDetail = [...trainDetail];
                    const _newData = await detailAPI([item]);
                    _trainDetail = [..._trainDetail, ..._newData];
                    await setTrainDetail(_trainDetail);
                  }}
                >
                  <p className="text-blue-400 text-sm">{item.headCode}</p>
                  <p className="font-bold text-lg">
                    {item.originLocation} - {item.destinationLocation}
                  </p>
                  <p className="text-gray-500">{item.lastReportedType}</p>
                </button>
              </List.Item>
            )}
          />
        )}

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
            <Tabs.TabPane key={0} tab="All">
              <List
                size="large"
                dataSource={data.filter((item) => {
                  return item.Headcode.toLowerCase().includes(
                    searchText.toLowerCase()
                  );
                })}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track Train"
                    description="Are you sure you want to track this Train?"
                    onConfirm={() => setTracked(item)}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.Headcode}</div>
                      <div>
                        {item.StartTIPLOC} --------- {item.EndTIPLOC}
                      </div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key={1} tab="Recently Used">
              <List
                size="large"
                dataSource={recentlyUsed.filter((item) => {
                  return item.Headcode.toLowerCase().includes(
                    searchText.toLowerCase()
                  );
                })}
                renderItem={(item) => (
                  <Popconfirm
                    icon={null}
                    title="Track Train"
                    description="Are you sure you want to track this Train?"
                    onConfirm={() => setTracked(item)}
                    onCancel={() =>
                      setRecentlyUsed(recentlyUsed.filter((i) => i !== item))
                    }
                    okText="Yes"
                    cancelText="Remove from recently used"
                  >
                    <List.Item className="hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer">
                      <div>{item.Headcode}</div>
                      <div>
                        {item.StartTIPLOC} --------- {item.EndTIPLOC}
                      </div>
                    </List.Item>
                  </Popconfirm>
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key={2} tab="From tracked trains">
              ...
            </Tabs.TabPane>
          </Tabs>
        </Drawer>
      </Drawer>
    </>
  );
};

export default Trains;

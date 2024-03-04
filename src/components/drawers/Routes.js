// ------------------- Outside Components -------------------
import { useState, useEffect } from "react";
import { Drawer, Space, Button, List } from "antd";

// ------------------- Our Components -------------------
import MyInput from "./routes/Input.js";
import MyPopupConfirm from "./routes/PopupConfirm.js";
import { getBackgroundColor, getHoverStyles } from "./routes/ListItemStyle.js";
import MyListItem from "./routes/ListItem.js";

// ------------------- Hooks Import -------------------
import { UseTrackedRoutes } from "../../hooks/TrackedRoutesHook.js";
import { UseRoutes } from "../../hooks/RoutesHook.js";
import { UseTrackedLocations } from "../../hooks/TrackedLocationsHook.js";

// ------------------- API -------------------
import { tiplocAPI } from "../../api/tiplocAPI.js";
import { detailAPI } from "../../api/detailAPI.js";

// ------------------- CSS -------------------
import "../../css/drawer.css";
import Icon from "../Icons.js";

const Routes = (props) => {
  // ------------------- useStates -------------------
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ------------------- Hooks -------------------
  const { trackedLocations } = UseTrackedLocations();
  const { routes, setRoutes } = UseRoutes();
  const { trackedRoutes, setTrackedRoutes } = UseTrackedRoutes();

  // ------------------- Functions -------------------
  // Stop tracking a route
  const stopTracking = async (item) => {
    localStorage.clear();
    let _trackedRoutes = [...trackedRoutes];
    const _itemToRemove = item;
    _trackedRoutes = _trackedRoutes.filter((route) => route !== _itemToRemove);
    await setTrackedRoutes(_trackedRoutes);
  };

  // Start tracking a route
  const startTracking = async (item) => {
    localStorage.clear();
    let _trackedRoutes = [...trackedRoutes];
    const _newData = await detailAPI([item]);
    _trackedRoutes = [..._trackedRoutes, ..._newData];
    await setTrackedRoutes(_trackedRoutes);
  };

  // Open and close second drawer
  const showChildrenDrawer = () => setChildrenDrawer(true);
  const onChildrenDrawerClose = () => setChildrenDrawer(false);

  // ------------------- UseEffects -------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // All routes information from the API
        const _routes = await tiplocAPI(trackedLocations);

        // Exit if not array
        if (!Array.isArray(_routes)) return;

        // Keep track of tracked routes ID & operators
        let _trackedRoutes = [];
        trackedRoutes.forEach((__trackedRoute) => {
          _trackedRoutes.push({
            ID: __trackedRoute.tiploc.activationId,
            operator: __trackedRoute.tiploc.toc_Name,
          });
        });

        // Filter routes to only include those that are not already tracked
        const _filteredRoutes = _routes.filter(
          (route) =>
            !_trackedRoutes.some(
              (trackedRoute) =>
                trackedRoute.ID === route.activationId &&
                trackedRoute.operator === route.toc_Name
            )
        );

        // Set the routes to the filtered routes
        setRoutes(_filteredRoutes.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [trackedLocations, trackedRoutes]);

  // ------------------- Local veriables -------------------
  // This are to set common styles for both drawers at once
  const placement = "left";
  const closeIcon = <Icon iconName="close" />;
  const listStyle = { size: "200px" };
  const drawerStyle = { padding: 0 };

  return (
    <>
      {/* First menu drawer */}
      <Drawer
        title="Tracked Routes"
        onClose={() => {
          props.setActiveDraw("menu");
        }}
        open={props.isOpen}
        placement={placement}
        closeIcon={closeIcon}
        bodyStyle={drawerStyle}
        extra={
          <Space>
            <Button
              onClick={showChildrenDrawer}
              shape="circle"
              type="primary"
              ghost
              icon={<Icon iconName="add" />}
            ></Button>
          </Space>
        }
      >
        {/* Search box on first menu */}
        <MyInput onChange={(e) => setSearchText(e.target.value)} />

        {/* List routes on first menu */}
        <List
          size="large"
          dataSource={trackedRoutes}
          style={listStyle}
          renderItem={(item) => (
            <MyPopupConfirm
              title="Stop Tracking"
              description="Are you sure you want to stop tracking this route?"
              onConfirm={async () => {
                await stopTracking(item);
              }}
            >
              <List.Item
                className={`${getHoverStyles()} ${getBackgroundColor(
                  item.tiploc.lastReportedType
                )}`}
              >
                <MyListItem item={item.tiploc} />
              </List.Item>
            </MyPopupConfirm>
          )}
        />
        {/* Second menu drawer */}
        <Drawer
          title="Track New Route"
          closable={true}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          placement={placement}
          closeIcon={closeIcon}
          bodyStyle={drawerStyle}
        >
          {/* Search box on second menu */}
          <MyInput onChange={(e) => setSearchText(e.target.value)} />

          {routes && routes.length > 0 && (
            <List
              size="large"
              dataSource={routes}
              style={listStyle}
              renderItem={(item) => (
                <MyPopupConfirm
                  title="Track Route"
                  description="Are you sure you want to track this route?"
                  onConfirm={async () => {
                    await startTracking(item);
                  }}
                >
                  <List.Item
                    className={`${getHoverStyles()} ${getBackgroundColor(
                      item.lastReportedType
                    )}`}
                  >
                    <MyListItem item={item} />
                  </List.Item>
                </MyPopupConfirm>
              )}
            />
          )}
        </Drawer>
      </Drawer>
    </>
  );
};

export default Routes;

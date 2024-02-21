import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal, Tabs, Typography, Tooltip, TreeSelect } from "antd";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input } from "antd";
import { NumericInput } from "../inputs/NumericInput";

// Settings Hook
import { useSettings } from "../../hooks/SettingsHook";
import { useMap } from "../../hooks/MapHook";

// Cookies
import Cookies from "js-cookie";

import {
  themeItems,
  zoomControlsPositionItems,
  paginationItems,
  menuDirectionItems,
  notificationsOptions,
} from "../../settings/settingsOptions";

// Should remove a specfic cookie will need for tomorrow, so leaving here
// Cookies.remove('COOKIENAME');

const allCookies = Cookies.get();

// for (const cookieName in allCookies) {
//   Cookies.remove(cookieName);
// }

// Map Tilelayer Selector

const { TabPane } = Tabs;

const Settings = (props) => {
  const { settings, setSettings } = useSettings();
  const { map, setMap } = useMap();

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const [defaultZoom, setDefaultZoom] = useState(settings.defaultZoom);
  const [inspectZoom, setInspectZoom] = useState(settings.inspectZoom);
  const [superZoom, setSuperZoom] = useState(settings.superZoom);

  useEffect(() => {
    if (defaultZoom > 1) {
      setSettings({
        ...settings,
        defaultZoom: defaultZoom,
      });

      if (map) {
        setMap(
          map.setView(
            [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
            defaultZoom
          )
        );
      }
    }
  }, [defaultZoom]);

  useEffect(() => {
    if (inspectZoom > 1) {
      setSettings({
        ...settings,
        inspectZoom: inspectZoom,
      });
      if (map) {
        setMap(
          map.setView(
            [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
            inspectZoom
          )
        );
      }
    }
  }, [inspectZoom]);

  useEffect(() => {
    if (superZoom > 1) {
      setSettings({
        ...settings,
        superZoom: superZoom,
      });
      if (map) {
        setMap(
          map.setView(
            [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
            superZoom
          )
        );
      }
    }
  }, [superZoom]);

  const handleOk = (e) => {
    props.setOpen(false);
  };

  const handleCancel = (e) => {
    props.setOpen(false);
    if (map) {
      setMap(
        map.setView(
          [settings.defaultCenter.Latitude, settings.defaultCenter.Longitude],
          settings.defaultZoom
        )
      );
    }
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setSettings({
            ...settings,
            defaultCenter: {
              Longitude: position.coords.longitude,
              Latitude: position.coords.latitude,
            },
          });
          setMap(
            map.setView(
              [
                settings.defaultCenter.Latitude,
                settings.defaultCenter.Longitude,
              ],
              settings.superZoom
            )
          );
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  };

  return (
    <>
      <Modal
        centered
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <span>
              <SettingOutlined style={{ marginRight: "8px" }} />
              Settings
            </span>
          </div>
        }
        open={props.isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span>Map</span>} key="1">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Theme
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: themeItems,
                      selectable: true,
                      selectedKeys: settings.mapTheme.key,
                      onClick: (theme) => {
                        const themeItem = themeItems.find(
                          (item) => item.key === theme.key
                        );

                        message.info(`${themeItem.label} activated`);
                        setSettings({ ...settings, mapTheme: themeItem });
                        Cookies.set("theme", themeItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.mapTheme.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Zoom Controls
                </dt>
                <dd class="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: zoomControlsPositionItems,
                      selectable: true,
                      selectedKeys: settings.zoomControlsPosition.key,
                      onClick: (zoom) => {
                        const zoomItem = zoomControlsPositionItems.find(
                          (item) => item.key === zoom.key
                        );

                        message.info(`${zoomItem.label} activated`);
                        setSettings({
                          ...settings,
                          zoomControlsPosition: zoomItem,
                        });
                        Cookies.set("theme", zoomItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.zoomControlsPosition.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Default Zoom
                </dt>
                <dd class="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <NumericInput
                    popPrefix="x"
                    popSuffix=" zoom, we recommend x6 to x12"
                    value={defaultZoom}
                    onChange={setDefaultZoom}
                  />
                </dd>
                <div className="col-span-2 col-start-2">
                  <p class="text-sm font-normal leading-6 text-gray-500">
                    This represents the default zoom level that your map will
                    initially display.
                  </p>
                </div>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Inspect Zoom
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <NumericInput
                    popPrefix="x"
                    popSuffix=" zoom, we recommend x12 to x18"
                    value={inspectZoom}
                    onChange={setInspectZoom}
                  />
                </dd>
                <div className="col-span-2 col-start-2">
                  <p class="text-sm font-normal leading-6 text-gray-500">
                    Provides a closer view of an object, offering a more
                    detailed and magnified perspective for focused examination.
                  </p>
                </div>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Super Zoom
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <NumericInput
                    popPrefix="x"
                    popSuffix=" zoom, we recommend x16 to x24"
                    value={superZoom}
                    onChange={setSuperZoom}
                  />
                </dd>
                <div className="col-span-2 col-start-2">
                  <p class="text-sm font-normal leading-6 text-gray-500">
                    Provides a super close view of an object, offering a more
                    very detailed and magnified perspective.
                  </p>
                </div>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Default Center
                </dt>
                <dd class="flex gap-x-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Input
                    value={settings.defaultCenter.Latitude}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultCenter: {
                          ...settings.defaultCenter,
                          Latitude: e.target.value,
                        },
                      })
                    }
                  />
                  <Input
                    value={settings.defaultCenter.Longitude}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultCenter: {
                          ...settings.defaultCenter,
                          Longitude: e.target.value,
                        },
                      })
                    }
                  />
                </dd>
                <div className="col-span-2 col-start-2 justify-end flex">
                  <Button onClick={getMyLocation}>Set location to local</Button>
                </div>
              </div>
            </dl>
          </TabPane>
          <TabPane tab={<span>Menus</span>} key="2">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Pagination
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: paginationItems,
                      selectable: true,
                      selectedKeys: settings.pagination.key,
                      onClick: (pagination) => {
                        const paginationItem = paginationItems.find(
                          (item) => item.key === pagination.key
                        );

                        message.info(`${paginationItem.label} activated`);
                        setSettings({
                          ...settings,
                          pagination: paginationItem,
                        });
                        Cookies.set("pagination", paginationItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.pagination.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Alignment
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Dropdown
                    menu={{
                      items: menuDirectionItems,
                      selectable: true,
                      selectedKeys: settings.menuDirection.key,
                      onClick: (menuDirection) => {
                        const menuDirectionItem = menuDirectionItems.find(
                          (item) => item.key === menuDirection.key
                        );

                        message.info(`${menuDirectionItem.label} activated`);
                        setSettings({
                          ...settings,
                          menuDirection: menuDirectionItem,
                        });
                        Cookies.set("alignment", menuDirectionItem);
                      },
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        {settings.menuDirection.label}
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </dd>
              </div>
            </dl>
          </TabPane>
          <TabPane tab={<span>Notifications</span>} key="3">
            <TreeSelect
              className="w-full"
              treeData={notificationsOptions}
              value={settings.notifications}
              treeCheckable
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              placeholder="Please select notifications to enable/disable"
              onChange={(e) => {
                console.log(e);
                setSettings({ ...settings, notifications: e });
              }}
            />
          </TabPane>
          <TabPane tab={<span>Advanced</span>} key="4">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Cookies
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-end">
                  <Button
                    style={{ marginLeft: "8px" }}
                    danger
                    onClick={() => {
                      for (const cookieName in allCookies) {
                        Cookies.remove(cookieName);
                      }
                      window.location.reload();
                    }}
                  >
                    Reset
                  </Button>
                </dd>
              </div>
            </dl>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default Settings;

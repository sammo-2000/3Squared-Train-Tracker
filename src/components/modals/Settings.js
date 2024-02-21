import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal, Tabs, Typography, Tooltip } from "antd";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input } from "antd";

// Settings Hook
import { useSettings } from "../../hooks/SettingsHook";
import { useMap } from "../../hooks/MapHook";

// Cookies
import Cookies from "js-cookie";

// Should remove a specfic cookie will need for tomorrow, so leaving here
// Cookies.remove('COOKIENAME');

const allCookies = Cookies.get();

// for (const cookieName in allCookies) {
//   Cookies.remove(cookieName);
// }

// Map Tilelayer Selector
const themeItems = [
  {
    label: "Dark Theme",
    key: "1",
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  },
  {
    label: "Light Theme",
    key: "2",
    url: "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}",
  },
  {
    label: "Realistic Theme",
    key: "3",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
];

const zoomControlsPositionItems = [
  {
    label: "Top Left",
    key: "1",
    value: "topleft",
  },
  {
    label: "Top Right",
    key: "2",
    value: "topright",
  },
  {
    label: "Bottom Left",
    key: "3",
    value: "bottomleft",
  },
  {
    label: "Bottom Right",
    key: "4",
    value: "bottomright",
  },
];

const { TabPane } = Tabs;

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const NumericInput = (props) => {
  const { value, onChange, popSuffix, popPrefix } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    if (value && typeof value === "string") {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === "." || value === "-") {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    }
  };

  const title = value ? (
    <span className="numeric-input-title">
      {popPrefix ? popPrefix : null}
      {value !== "-" ? formatNumber(Number(value)) : "-"}
      {popSuffix ? popSuffix : null}
    </span>
  ) : (
    "Input a number"
  );

  return (
    <Tooltip
      trigger={["focus"]}
      autoAdjustOverflow={true}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
        suffix={false}
        prefix={false}
      />
    </Tooltip>
  );
};

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
            </dl>
          </TabPane>
          <TabPane tab={<span>Advanced</span>} key="2">
            <span>
              Clear Cookies
              <Button
                style={{ marginLeft: "8px" }}
                type="primary"
                danger
                onClick={() => {
                  for (const cookieName in allCookies) {
                    Cookies.remove(cookieName);
                  }
                  window.location.reload();
                }}
              >
                Clear
              </Button>
            </span>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default Settings;

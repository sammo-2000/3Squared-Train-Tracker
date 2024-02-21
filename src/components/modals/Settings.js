import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal, Tabs } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

// Settings Hook
import { useSettings } from "../../hooks/SettingsHook";

// Cookies
import Cookies from "js-cookie";

// Should remove a specfic cookie will need for tomorrow, so leaving here
// Cookies.remove('COOKIENAME');

const allCookies = Cookies.get();

// for (const cookieName in allCookies) {
//   Cookies.remove(cookieName);
// }

// Map Tilelayer Selector
const items = [
  {
    label: "Dark Theme",
    key: "1",
  },
  {
    label: "Light Theme",
    key: "2",
  },
  {
    label: "Realistic Theme",
    key: "3",
  },
];

const { TabPane } = Tabs;

const Settings = (props) => {
  const { setSettings } = useSettings();
  useEffect(() => {
    setSettings(2);
  }, [setSettings]);

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    setSettings(key);
    Cookies.set("theme", key);
  };

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const handleOk = (e) => {
    props.setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    props.setOpen(false);
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
          <TabPane tab={<span>General</span>} key="1">
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a onClick={(e) => e.preventDefault()} href="#">
                <Space>Map Themes</Space>
              </a>
            </Dropdown>
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

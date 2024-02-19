import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

// Theme Hook
import { useTheme } from "../hooks/ThemeHooks";

// Cookies
import Cookies from 'js-cookie';

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

const Settings = (props) => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(1);
  }, [setTheme]);

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    setTheme(key);
    Cookies.set('theme', key);
  };

  const [open, setOpen] = useState(props.setOpen);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
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
            Settings
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
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
        <Dropdown
          menu={{
            items,
            onClick,
          }}
        >
          <a onClick={(e) => e.preventDefault()} href="#">
            <Space>
              Map Themes
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Modal>
    </>
  );
};
export default Settings;

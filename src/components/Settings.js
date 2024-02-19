import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

import { useTheme } from "../hooks/ThemeHooks";

const items = [
  {
    label: "1st menu item",
    key: "1",
    theme: "theme1",
  },
  {
    label: "2nd menu item",
    key: "2",
    theme: "theme2",
  },
  {
    label: "3rd menu item",
    key: "3",
    theme: "theme3",
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
      {/* <div className="absolute top-[5.5rem] left-0 flex-col text-center z-[1000] m-3 rounded-xl bg-white border-2 border-gray-200 overflow-hidden divide-y-2 divide-gray-200">
        <Settings />
      </div> */}
      {/* <div className="absolute top-[25rem] left-0 flex-col text-center z-[1000] m-3 rounded-xl bg-white border-2 border-gray-200 overflow-hidden divide-y-2 divide-gray-200">
        <Button onClick={showModal}>Settings</Button>
      </div> */}
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
              Hover me, Click menu item
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Modal>
    </>
  );
};
export default Settings;

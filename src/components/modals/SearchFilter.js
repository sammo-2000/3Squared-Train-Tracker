import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal, Tabs, Typography, Tooltip, TreeSelect } from "antd";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input } from "antd";
import { NumericInput } from "../inputs/NumericInput";
import Icon from "../Icons";

// Map Tilelayer Selector

const { TabPane } = Tabs;

const SearchFilter = (props) => {
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
            <div className="flex gap-x-1">
              <Icon iconName="filter" />
              Filter
            </div>
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
          <TabPane tab={<span>Options</span>} key="1">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Filter
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  National Map for the Rail Network in the UK, providing a
                  schematic representation of routes, stops, and the progress of
                  trains. The map will utilize data from the 3Squared Train Data
                  API, offering information such as coordinates for locations on
                  the rail network and the schedule for each train's journey.
                </dd>
              </div>
            </dl>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default SearchFilter;

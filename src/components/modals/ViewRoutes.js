import { UseRoutes } from "../../hooks/RoutesHook.js";

import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Draggable from "react-draggable";

import { Modal, Switch } from "antd";
import { useSettings } from "../../hooks/SettingsHook";

import {
  getBackgroundColor,
  getHoverStyles,
} from "../../components/drawers/routes/ListItemStyle.js";
import ListItem from "../../components/drawers/routes/ListItem.js";

function ViewRoutes(props) {
  const { settings, setSettings } = useSettings();
  const { routes, setRoutes } = UseRoutes();
  const [disabled, setDisabled] = useState(true);
  const [filteredType, setFilteredType] = useState();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const location = props.location;

  // Filter routes based on the currently selected tiploc
  let fromFilteredRoutes = routes.filter((route) => {
    return route.originTiploc === location.Tiploc;
  });

  let toFilteredRoutes = routes.filter((route) => {
    return route.destinationTiploc === location.Tiploc;
  });

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
    <div>
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
            heiight={10}
            // end
          >
            <span>Location Details</span>
          </div>
        }
        open={props.isOpen}
        footer={null}
        onCancel={handleCancel}
        okButtonProps={false}
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
        <div>
          <button onClick={() => setFilteredType("from")}>
            Set Filtered Type to "from"
          </button>
          <button onClick={() => setFilteredType("to")}>
            Set Filtered Type to "to"
          </button>
          {filteredType === "from"
            ? fromFilteredRoutes.map((route, index) => (
                <div
                  className={`${getHoverStyles()} ${getBackgroundColor()} p-3`}
                  key={index}
                >
                  <ListItem item={route} />
                </div>
              ))
            : toFilteredRoutes.map((route, index) => (
                <div
                  className={`${getHoverStyles()} ${getBackgroundColor()} p-3`}
                  key={index}
                >
                  <ListItem item={route} />
                </div>
              ))}
        </div>
      </Modal>
    </div>
  );
}

export default ViewRoutes;

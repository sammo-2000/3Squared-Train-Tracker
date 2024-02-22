import React, { useState } from "react";
import Draggable from 'react-draggable'; // Import Draggable

import logo from "../assets/icons/3squared.jpg";
import Icon from "./Icons";

import Locations from "./drawers/Locations";
import Trains from "./drawers/Trains";
import Routes from "./drawers/Routes";

import Settings from "./modals/Settings";
import { useSettings } from "../hooks/SettingsHook";

import { notification, message } from "antd";

function Navbar() {
  const { settings, setSettings } = useSettings();
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [settingsModal, setSettingsModal] = useState(false);
  const [notificationApi, notificationContext] = notification.useNotification();
  const [messageApi, messageContext] = message.useMessage();

  return (
    <div>
      {notificationContext}
      {messageContext}

      <Locations
        isOpen={activeDrawer === "locations"}
        setActiveDraw={setActiveDrawer}
        notifications={[notificationContext, notificationApi]}
        messages={[messageContext, messageApi]}
      />
      <Trains
        isOpen={activeDrawer === "trains"}
        setActiveDraw={setActiveDrawer}
      />
      <Routes
        isOpen={activeDrawer === "routes"}
        setActiveDraw={setActiveDrawer}
      />
      <Settings isOpen={settingsModal} setOpen={setSettingsModal} />
      
        <div className="">
          <Draggable>
          <div
            className={`absolute top-0 ${
              settings.menuDirection.value === "right" ? "right-0" : "left-0"
            } flex flex-col text-center z-[1000] m-3 rounded-xl bg-white border-2 border-gray-100 overflow-hidden divide-x-2 divide-y-2 divide-gray-100`}
            >
            <div
              key={0}
              className="flex items-center flex-col transition-color duration-200 justify-center p-4 text-gray-700"
              >
              <img style={{ width: "7rem" }} src={logo} alt={`Icon ${0}`} />
            </div>
            <div
              key={1}
              className="flex items-center flex-col transition-color duration-200 hover:text-blue-600 hover:bg-blue-100 justify-center p-4 cursor-pointer text-gray-700"
              onClick={() => setActiveDrawer("locations")}
              >
              <Icon iconName="location" />
              <span>Locations</span>
            </div>
            <div
              key={3}
              className="flex items-center flex-col transition-color duration-200 hover:text-blue-600 hover:bg-blue-100 justify-center p-4 cursor-pointer"
              onClick={() => setActiveDrawer("routes")}
            >
              <Icon iconName="route" />
              <span>Routes</span>
            </div>
            <div
              key={4}
              className="flex items-center flex-col transition-color duration-200 hover:text-blue-600 hover:bg-blue-100 justify-center p-4 cursor-pointer"
              onClick={() => setSettingsModal(settingsModal ? false : true)}
              >
              <Icon iconName="settings" />
              <span>Settings</span>
            </div>
          </div>
          </Draggable>
        </div>
    </div>
  );
}

export default Navbar;

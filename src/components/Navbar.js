import React, { useState } from "react";

import location from "../assets/icons/location.svg";
import route from "../assets/icons/route.svg";
import train from "../assets/icons/train.svg";
import settings from "../assets/icons/settings.svg";

import Locations from "./drawers/Locations";
import Trains from "./drawers/Trains";
import Routes from "./drawers/Routes";

import Settings from "./modals/Settings";

import { notification, message } from "antd";

function Navbar() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [settingsModal, setSettingsModal] = useState(false);
  const [notificationApi, notificationContext] = notification.useNotification();
  const [messageApi, messageContext] = message.useMessage();

  return (
    <div>
      {notificationContext}
      {messageContext}

      {activeDrawer === "locations" && (
        <Locations
          setActiveDraw={setActiveDrawer}
          notifications={[notificationContext, notificationApi]}
          messages={[messageContext, messageApi]}
        />
      )}
      {activeDrawer === "trains" && <Trains setActiveDraw={setActiveDrawer} />}
      {activeDrawer === "routes" && <Routes setActiveDraw={setActiveDrawer} />}

      <Settings isOpen={settingsModal} setOpen={setSettingsModal} />

      <div className="">
        <div className="absolute top-[5.5rem] left-0 flex-col text-center z-[1000] m-3 rounded-xl bg-white border-2 border-gray-200 overflow-hidden divide-y-2 divide-gray-200">
          <div
            key={0}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer text-gray-700"
            onClick={() => setActiveDrawer("locations")}
          >
            <img style={{ width: "2rem" }} src={location} alt={`Icon ${0}`} />
            <span className="text-gray-700">Locations</span>
          </div>
          <div
            key={1}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer"
            onClick={() => setActiveDrawer("trains")}
          >
            <img style={{ width: "2rem" }} src={train} alt={`Icon ${1}`} />
            <span>Trains</span>
          </div>
          <div
            key={2}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer"
            onClick={() => setActiveDrawer("routes")}
          >
            <img style={{ width: "2rem" }} src={route} alt={`Icon ${1}`} />
            <span>Routes</span>
          </div>
          <div
            key={3}
            className="flex items-center flex-col transition-color duration-200 hover:bg-gray-200 justify-center p-4 cursor-pointer"
            onClick={() => setSettingsModal(settingsModal ? false : true)}
          >
            <img style={{ width: "2rem" }} src={settings} alt={`Icon ${1}`} />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

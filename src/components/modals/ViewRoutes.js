import React, { useEffect } from "react";
import { UseRoutes } from "../../hooks/RoutesHook.js";

function ViewRoutes() {
  const { routes, setRoutes } = UseRoutes();

  if (routes && routes.length > 0) {
    console.log("Routes im getting", routes);
  }

  return null;
}

export default ViewRoutes;

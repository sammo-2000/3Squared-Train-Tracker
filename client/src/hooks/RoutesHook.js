import { useContext } from "react";
import { RoutesContext } from "../contexts/RoutesContext.js";

export const UseRoutes = () => {
  const context = useContext(RoutesContext);

  if (!context)
    throw new Error("UseRoutes must be used within a TiplocDetailProvider");

  return context;
};

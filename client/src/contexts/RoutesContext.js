import { useState, createContext } from "react";

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);
  return (
    <RoutesContext.Provider value={{ routes, setRoutes }}>
      {children}
    </RoutesContext.Provider>
  );
};

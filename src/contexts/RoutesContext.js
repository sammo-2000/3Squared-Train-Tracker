import { useState, createContext } from "react";

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const [tiplocDetail, setTiplocDetail] = useState([]);
  return (
    <RoutesContext.Provider value={{ tiplocDetail, setTiplocDetail }}>
      {children}
    </RoutesContext.Provider>
  );
};

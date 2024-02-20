import { useState, createContext } from "react";

export const TiplocDetailContext = createContext();

export const TiplocDetailProvider = ({ children }) => {
  const [tiplocDetail, setTiplocDetail] = useState([]);
  return (
    <TiplocDetailContext.Provider value={{ tiplocDetail, setTiplocDetail }}>
      {children}
    </TiplocDetailContext.Provider>
  );
};

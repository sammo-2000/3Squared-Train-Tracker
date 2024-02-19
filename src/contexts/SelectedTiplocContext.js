import { useState, createContext } from "react";

export const SelectedTiplocContext = createContext();

export const SelectedTiplocProvider = ({ children }) => {
  const [selectedTiploc, setSelectedTiploc] = useState([]);
  return (
    <SelectedTiplocContext.Provider
      value={{ selectedTiploc, setSelectedTiploc }}
    >
      {children}
    </SelectedTiplocContext.Provider>
  );
};

import { useContext } from "react";
import { SelectedTiplocContext } from "../contexts/SelectedTiplocContext.js";

export const UseSelectedTiploc = () => {
  const context = useContext(SelectedTiplocContext);

  if (!context)
    throw new Error(
      "UseSelectedTiploc must be used within a SelectedTiplocProvider"
    );

  return context;
};

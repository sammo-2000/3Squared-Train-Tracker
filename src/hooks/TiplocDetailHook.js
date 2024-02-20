import { useContext } from "react";
import { TiplocDetailContext } from "../contexts/TiplocDetailContext.js";

export const UseTiplocDetail = () => {
  const context = useContext(TiplocDetailContext);

  if (!context)
    throw new Error(
      "UseTiplocDetail must be used within a TiplocDetailProvider"
    );

  return context;
};

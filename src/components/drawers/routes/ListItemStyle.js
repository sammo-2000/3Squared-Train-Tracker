export const getBackgroundColor = (lastReportedType) => {
  if (lastReportedType === "CANCELLED") {
    return "bg-red-100 hover:bg-red-200";
  } else if (lastReportedType === "TERMINATED") {
    return "bg-yellow-100 hover:bg-yellow-200";
  }
  return "";
};

export const getHoverStyles = () => {
  return "hover:bg-gray-100 transition-colors ease-in-out duration-150 cursor-pointer";
};

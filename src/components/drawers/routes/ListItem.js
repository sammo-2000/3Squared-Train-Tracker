import React from "react";

const MyListItem = ({ item }) => {
  return (
    <button className="flex flex-col gap-1 w-full items-start">
      <p className="text-blue-400 text-sm">{item.headCode}</p>
      <p className="text-blue-600 text-sm">{item.toc_Name}</p>
      <p className="font-bold text-lg my-2">
        {item.originLocation} - {item.destinationLocation}
      </p>
      <p className="text-gray-500">{item.lastReportedType}</p>
    </button>
  );
};

export default MyListItem;

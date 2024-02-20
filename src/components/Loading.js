import React from "react";
import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <GridLoader color="#1677ff" size={150} />
    </div>
  );
};

export default Loading;

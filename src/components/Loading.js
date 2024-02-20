import React from "react";
import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <GridLoader color="#36d7b7" size={150} />
    </div>
  );
};

export default Loading;

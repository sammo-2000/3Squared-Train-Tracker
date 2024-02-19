import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <HashLoader color="#36d7b7" size={150} />
    </div>
  );
};

export default Loading;

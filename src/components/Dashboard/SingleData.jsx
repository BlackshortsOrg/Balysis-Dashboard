import React from "react";

const SingleData = () => {
  return (
    <div className="flex flex-row items-center justify-between mt-2">
      <div className="flex flex-row items-center justify-between">
        <img src="/images/dummy.png" alt="candidate" className="w-10 h-10" />
        <h1 className="text-lg font-regular ml-6">Abhinav Gupta</h1>
      </div>
      <div className="flex flex-col items-end justify-end">
        <h1 className="text-lg font-semibold ml-6">$2,350</h1>
        <h1 className="text-xs font-semibold ml-6 text-green-600">2.35%</h1>
      </div>
    </div>
  );
};

export default SingleData;

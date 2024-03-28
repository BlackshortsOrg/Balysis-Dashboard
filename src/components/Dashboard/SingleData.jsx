import React from "react";

const SingleData = ({ data }) => {
  return (
    <div className="flex flex-row items-center justify-between mt-2">
      <div className="flex flex-row items-center justify-between">
        <img src="/images/dummy.png" alt="candidate" className="w-10 h-10" />
        <h1 className="text-lg font-regular ml-6">{data.name}</h1>
      </div>
      <div className="flex flex-col items-end justify-end">
        <h1 className="text-lg font-semibold ml-6">
          <span class="text-xl font-semibold">&#x20B9; </span>
          {data.totalPnl}
        </h1>
        <h1 className="text-xs font-semibold ml-6 text-green-600">--%</h1>
      </div>
    </div>
  );
};

export default SingleData;

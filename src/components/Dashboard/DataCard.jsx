import React from "react";
import SingleData from "./SingleData";
const DataCard = () => {
  return (
    <div className="flex flex-col w-[38.5vw] justify-between py-6 bg-white drop-shadow-md rounded-xl px-8 mt-4 ml-[50px]">
      <h1 className="text-xl font-bold">Top Gainer</h1>
      <SingleData />
      <SingleData />
      <SingleData />
    </div>
  );
};

export default DataCard;

import React from "react";
import SingleData from "./SingleData";
const DataCard = ({ typ, details }) => {
  let data = Array.from(details["individualPnlData"]);
  if(typ === "Gainer") data = data.slice(0, 3);
  else data = data.slice(-3).reverse();
  return (
    <div className="flex flex-col w-[38.5vw] justify-between py-6 bg-white drop-shadow-md rounded-xl px-8 mt-4 ml-[50px]">
      <h1 className="text-xl font-bold">Top {typ}</h1>
      {data.map((item, index) => (
        <SingleData data={item} />
      ))}
    </div>
  );
};

export default DataCard;

"use client";
import { useEffect } from "react";

const SecurityCard = ({ header, data }) => {
  data = parseFloat(data).toFixed(2);
  data = data.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  return (
    <div className="py-8 bg-white drop-shadow-md rounded-xl px-9">
      <div className="text-[#000F20] opacity-80 font-bold text-base">
        {header}
      </div>
      <div className="text-2xl font-bold text-[#000F20]">
        <span class="text-xl font-semibold">&#x20B9; </span>
        {data}
      </div>
    </div>
  );
};

export default SecurityCard;

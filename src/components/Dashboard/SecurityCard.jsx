"use client";
import { useEffect } from "react";

const SecurityCard = ({ header, data }) => {
  console.log(header, data);
  useEffect(() => {
    console.log(header, data);
  })
  return (
    <div className="py-6 bg-white drop-shadow-md rounded-xl px-6">
      <div className="text-[#000F20] opacity-80 font-bold text-base">
        {header}
      </div>
      <div className="text-2xl font-bold text-[#000F20]">
        {data}
      </div>
    </div>
  );
};

export default SecurityCard;

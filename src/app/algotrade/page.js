"use client";
import { getAllStrategyMetrics } from "@/api/getAllStrategyMetrics";
import StrategiesHeader from "@/components/AlgoTrade/StrategiesHeader";
import StrategyBox from "@/components/AlgoTrade/StrategyBox";
import { useEffect, useState } from "react";

export default function algotrade() {
  const [strategies_data, setStrategiesData] = useState({});
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      getAllStrategyMetrics(token).then((data) => {
        console.log(data);
        console.log(Object.keys(data));
        setStrategiesData(data);
      });
    });
  }, []);
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Algo Trade</h1>
      </div>
      <StrategiesHeader />
      {Object.keys(strategies_data).map((k) => (
        <StrategyBox
          id={strategies_data[k].id}
          name={k}
          total_realised_pnl={strategies_data[k].total_realised_pnl}
          total_unrealised_pnl={strategies_data[k].total_unrealised_pnl}
          disabled={!strategies_data[k].active}
        />
      ))}
    </div>
  );
}

"use client";
import { getAllStrategyMetrics } from "@/api/getAllStrategyMetrics";
import StrategiesHeader from "@/components/AlgoTrade/StrategiesHeader";
import StrategyBox from "@/components/AlgoTrade/StrategyBox";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function algotrade() {
  const [daily, setDaily] = useState(true);
  const [strategies_data, setStrategiesData] = useState({});
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      console.log("No token found");
      window.location.href = "/login";
    } else {
      console.log("token found");
      return localStorage.getItem("token");
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      getAllStrategyMetrics(token, daily).then((data) => {
        console.log(data);
        console.log(Object.keys(data));
        setStrategiesData(data);
      });
    });
  }, [daily]);
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Algo Trade</h1>
        <div className="basis-[70%]"></div>
        <Tabs
          defaultValue="daily"
          value={daily ? "daily" : "alltime"}
          onValueChange={(e) => {
            setDaily(e === "daily");
          }}
          className=""
        >
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <StrategiesHeader />
      {Object.keys(strategies_data)
        .filter((k) => k != "manual")
        .map((k) => (
          <StrategyBox
            key={strategies_data[k].id}
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

"use client";
import StrategiesHeader from "@/components/AlgoTrade/StrategiesHeader";
import StrategyBox from "@/components/AlgoTrade/StrategyBox";

export default function algotrade() {
  const strategies_data = [
    { name: "STR-V5 50", unrealizedpnl: 123.3, realizedpnl: 12.3, numpositions: 3 },
    { name: "STR-V5 50", unrealizedpnl: 123.3, realizedpnl: 12.3, numpositions: 3 },
  ]
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Algo Trade</h1>
      </div>
      <StrategiesHeader />
      {strategies_data.map((strategy) => StrategyBox(strategy))}
    </div>
  );
}

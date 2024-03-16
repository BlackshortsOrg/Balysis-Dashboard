"use client";
import StrategiesHeader from "@/components/ClientPositions/StrategiesHeader";
import StrategyCard from "@/components/ClientPositions/StrategyCard";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserMetricAPI } from "@/api/getUserMetric";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function client({ params }) {
  const [daily, setDaily] = useState(true)
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [metrics, setMetrics] = useState({
    "Total P&L": 100000,
    "Realized P&L": 100000,
    "Unrealized P&L": 100000,
    "Equity P&L": 100000,
    "Derivative P&L": 100000,
    "Commodity P&L": 100000,
  });
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      // setToken(tk);
      return tk;
    }
  }
  const [strategiesData, setStrategiesData] = useState([]);
  async function fetchStrategiesData(token) {
    const resp = await getUserMetricAPI(parseInt(params.id), token, daily);
    const global_metrics = {
      "Total P&L": (
        parseFloat(resp.total_realised_pnl) +
        parseFloat(resp.total_unrealised_pnl)
      ).toFixed(2),
      "Realized P&L": resp.total_realised_pnl.toFixed(2),
      "Unrealized P&L": resp.total_unrealised_pnl.toFixed(2),
      "Equity P&L": resp.total_equity_pnl.toFixed(2),
      "Derivative P&L": (
        resp.total_futures_pnl + resp.total_options_pnl
      ).toFixed(2),
      "Commodity P&L": resp.total_commodity_pnl.toFixed(2),
    };
    setMetrics(global_metrics);
    let strategiesData = [];
    for (const strat in resp.strategies) {
      let data = {
        name: strat,
        realizedpnl: parseFloat(
          resp.strategies[strat].total_realised_pnl,
        ).toFixed(2),
        unrealizedpnl: parseFloat(
          resp.strategies[strat].total_unrealised_pnl,
        ).toFixed(2),
        holdings: {},
        positions: {},
      };
      for (const symbol in resp.strategies[strat].symbols) {
        if (symbol.endsWith("CNC")) {
          data.holdings[symbol] = {
            buyqty: resp.strategies[strat].symbols[symbol].buyqty,
            sellqty: resp.strategies[strat].symbols[symbol].sellqty,
            netqty: resp.strategies[strat].symbols[symbol].netqty,
            ltp: 0.0,
            realizedpnl: parseFloat(
              resp.strategies[strat].symbols[symbol].realised_pnl,
            ).toFixed(2),
            unrealizedpnl: parseFloat(
              resp.strategies[strat].symbols[symbol].unrealised_pnl,
            ).toFixed(2),
            avgprice: resp.strategies[strat].symbols[symbol].netavgprice,
          };
        } else {
          data.positions[symbol] = {
            buyqty: resp.strategies[strat].symbols[symbol].buyqty,
            sellqty: resp.strategies[strat].symbols[symbol].sellqty,
            netqty: resp.strategies[strat].symbols[symbol].netqty,
            ltp: 0.0,
            realizedpnl: parseFloat(
              resp.strategies[strat].symbols[symbol].realised_pnl,
            ).toFixed(2),
            unrealizedpnl: parseFloat(
              resp.strategies[strat].symbols[symbol].unrealised_pnl,
            ).toFixed(2),
            avgprice: resp.strategies[strat].symbols[symbol].netavgprice,
          };
        }
      }
      strategiesData.push(data);
    }
    setStrategiesData(strategiesData);
  }
  useEffect(() => {
    checkLogin().then((token) => {
      fetchStrategiesData(token);
    });
  }, [daily]);

  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto ">
      <div className="pl-[50px] flex flex-row w-full pt-10">
        <h1 className="font-bold text-2xl">{name}</h1>
        <div className="px-4">
          <Image src="/images/dummy.png" height={40} width={40} />
        </div>
        <div className="basis-[100%]"></div>
        <Tabs defaultValue="daily" value={daily ? "daily" : "alltime"} onValueChange={(e) => { setDaily(e === "daily") }} className="">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <SecurityCards metrics={metrics} />
      <StrategiesHeader />
      {strategiesData.map((strategy) => (
        <StrategyCard strategy={strategy} />
      ))}
    </div>
  );
}

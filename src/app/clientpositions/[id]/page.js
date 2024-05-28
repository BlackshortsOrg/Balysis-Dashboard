"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import StrategiesHeader from "@/components/ClientPositions/StrategiesHeader";
import StrategyCard from "@/components/ClientPositions/StrategyCard";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserMetricAPI } from "@/api/getUserMetric";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

export default function client({ params }) {
  const [dateRangeState, setDateRangeState] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [daily, setDaily] = useState(false);
  const [ltps, setLTPs] = useState({});
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
  const start_time = dateRangeState[0].startDate
    ? dateRangeState[0].startDate
    : new Date(0);
  start_time.setHours(0, 0, 0);
  const start = start_time.getTime() / 1000;
  const end_time = dateRangeState[0].endDate;
  end_time.setHours(23, 59, 59);
  const end = end_time.getTime() / 1000;
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
    const resp = await getUserMetricAPI(parseInt(params.id), token, start, end);
    console.log(resp.ltps);
    setLTPs(resp.ltps);
    console.log(resp);
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
        name:
          resp.strategies[strat].name +
          "-" +
          resp.strategies[strat].instance_id,
        realizedpnl: parseFloat(
          resp.strategies[strat].total_realised_pnl,
        ).toFixed(2),
        unrealizedpnl: parseFloat(
          resp.strategies[strat].total_unrealised_pnl,
        ).toFixed(2),
        holdings: {},
        positions: {},
        active: resp.strategies[strat].active,
        subscribed: resp.strategies[strat].subscribed,
        id: strat,
      };
      for (const symbol in resp.strategies[strat].symbols) {
        if (symbol.endsWith("CNC")) {
          data.holdings[symbol] = {
            name: resp.strategies[strat].symbols[symbol].name,
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
            name: resp.strategies[strat].symbols[symbol].name,
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
    strategiesData.sort((a, b) => a.name.localeCompare(b.name));
    setStrategiesData(strategiesData);
  }
  useEffect(() => {
    checkLogin().then((token) => {
      fetchStrategiesData(token);
    });
    const interval = setInterval(() => {
      checkLogin().then((token) => {
        fetchStrategiesData(token);
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [dateRangeState, daily]);

  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto ">
      <div className="pl-[50px] flex flex-row w-full pt-10">
        <h1 className="font-bold text-xl">{name}</h1>
        <div className="px-4">
          <Image src="/images/dummy.png" height={40} width={40} />
        </div>
        <div className="flex-grow"></div>
        <div className="flex gap-2">
          <div>
            {dateRangeState[0].startDate
              ? dateRangeState[0].startDate.toDateString()
              : "Start"}{" "}
            - {dateRangeState[0].endDate.toDateString()}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="addUser">
                <FaRegCalendarAlt />
                Change Date Range
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[600px]">
              <DateRangePicker
                onChange={(item) => setDateRangeState([item.selection])}
                showPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRangeState}
                direction="horizontal"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <SecurityCards metrics={metrics} />
      <StrategiesHeader />
      {strategiesData.map((strategy) => (
        <StrategyCard
          key={strategy.id}
          strategy={strategy}
          user_id={params.id}
          start={start}
          end={end}
          ltps={ltps}
        />
      ))}
    </div>
  );
}

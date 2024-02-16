"use client";
import StrategiesHeader from "@/components/ClientPositions/StrategiesHeader";
import StrategyCard from "@/components/ClientPositions/StrategyCard";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserMetricAPI } from "@/api/getUserMetric";

export default function client({ params }) {
  const [metrics, setMetrics] = useState({
    totalpnl: 100000,
    realizedpnl: 100000,
    unrealizedpnl: 100000,
    equitypnl: 100000,
    dertivativepnl: 100000,
    commoditypnl: 100000,
  });
  const [strategiesData, setStrategiesData] = useState([]);
  async function fetchStrategiesData() {
    const resp = await getUserMetricAPI(parseInt(params.id));
    const global_metrics = {
      totalpnl: (
        parseFloat(resp.total_realised_pnl) +
        parseFloat(resp.total_unrealised_pnl)
      ).toFixed(2),
      realizedpnl: resp.total_realised_pnl.toFixed(2),
      unrealizedpnl: resp.total_unrealised_pnl.toFixed(2),
      equitypnl: resp.total_equity_pnl.toFixed(2),
      dertivativepnl: (resp.total_futures_pnl + resp.total_options_pnl).toFixed(
        2,
      ),
      commoditypnl: resp.total_commodity_pnl.toFixed(2),
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
    fetchStrategiesData();
  }, []);
  // const strategiesData = [
  //   {
  //     name: "MANUAL",
  //     realizedpnl: 0.0,
  //     unrealizedpnl: -652.5,
  //     holdings: {
  //       "NSE:IDEA-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //       "NSE:ITC-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //     },
  //     positions: {
  //       "NSE:NIFTY28SEP2023": {
  //         qty: 50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       }
  //     }
  //   },
  //   {
  //     name: "STR-915-v3",
  //     realizedpnl: 0.0,
  //     unrealizedpnl: -652.5,
  //     holdings: {
  //       "NSE:IDEA-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //       "NSE:ITC-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //     },
  //     positions: {
  //       "NSE:NIFTY28SEP2023": {
  //         qty: 50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       }
  //     }
  //   },
  //   {
  //     name: "STR-915-v1",
  //     realizedpnl: 0.0,
  //     unrealizedpnl: -652.5,
  //     holdings: {
  //       "NSE:IDEA-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //       "NSE:ITC-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //     },
  //     positions: {
  //       "NSE:NIFTY28SEP2023": {
  //         qty: 50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       }
  //     }
  //   },
  //   {
  //     name: "STR-915-v2",
  //     realizedpnl: 0.0,
  //     unrealizedpnl: -652.5,
  //     holdings: {
  //       "NSE:IDEA-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //       "NSE:ITC-EQ": {
  //         qty: -50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       },
  //     },
  //     positions: {
  //       "NSE:NIFTY28SEP2023": {
  //         qty: 50,
  //         ltp: 20.25,
  //         realizedpnl: 652.25,
  //         unrealizedpnl: 0,
  //         avgprice: 23.4,
  //       }
  //     }
  //   },
  // ]
  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <h1 className="pl-[50px] font-bold text-2xl">Nandini Arora</h1>
        <div className="px-4">
          <Image src="/images/dummy.png" height={40} width={40} />
        </div>
      </div>
      <SecurityCards metrics={metrics} />
      <StrategiesHeader />
      {strategiesData.map((strategy) => (
        <StrategyCard strategy={strategy} />
      ))}
    </div>
  );
}

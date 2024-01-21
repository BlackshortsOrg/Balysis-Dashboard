import StrategiesHeader from "@/components/ClientPositions/StrategiesHeader";
import StrategyCard from "@/components/ClientPositions/StrategyCard";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import Image from "next/image";

export default function client() {
  const metrics =
  {
    "Total P&L": "1,00,000",
    "Realized P&L": "1,00,000",
    "Unrealized P&L": "1,00,000",
    "Equity P&L": "1,00,000",
    "Derivative P&L": "1,00,000",
    "Commodity P&L": "1,00,000",
  }
  const strategiesData = [
    {
      name: "MANUAL",
      realizedpnl: 0.0,
      unrealizedpnl: -652.5,
      holdings: {
        "NSE:IDEA-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
        "NSE:ITC-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
      },
      positions: {
        "NSE:NIFTY28SEP2023": {
          qty: 50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        }
      }
    },
    {
      name: "STR-915-v3",
      realizedpnl: 0.0,
      unrealizedpnl: -652.5,
      holdings: {
        "NSE:IDEA-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
        "NSE:ITC-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
      },
      positions: {
        "NSE:NIFTY28SEP2023": {
          qty: 50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        }
      }
    },
    {
      name: "STR-915-v1",
      realizedpnl: 0.0,
      unrealizedpnl: -652.5,
      holdings: {
        "NSE:IDEA-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
        "NSE:ITC-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
      },
      positions: {
        "NSE:NIFTY28SEP2023": {
          qty: 50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        }
      }
    },
    {
      name: "STR-915-v2",
      realizedpnl: 0.0,
      unrealizedpnl: -652.5,
      holdings: {
        "NSE:IDEA-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
        "NSE:ITC-EQ": {
          qty: -50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        },
      },
      positions: {
        "NSE:NIFTY28SEP2023": {
          qty: 50,
          ltp: 20.25,
          realizedpnl: 652.25,
          unrealizedpnl: 0,
          avgprice: 23.4,
        }
      }
    },
  ]
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

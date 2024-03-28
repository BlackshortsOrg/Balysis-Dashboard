"use client";
import { AlgoTradeTable } from "@/components/AlgoTrade/AlgoTradeTable";
import TrxJournals, { TrnxJournals } from "@/components/AlgoTrade/TrnxJournals";
import Variable from "@/components/AlgoTrade/Variable";
import Breadcrumbs from "@/components/Breadcrumb";
import SecurityCards from "@/components/Dashboard/SecurityCards";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getAlgoMetricsUserwise } from "@/api/getAlgoUserwise";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "radix-ui";
import { Input } from "@/components/ui/input";

export default function algo({ params }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("Config");

  const column = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "username",
      cell: ({ cell, row }) => (
        <div className="flex flex-row items-center">
          <img
            className="rounded-full"
            src="/images/dummy.png"
            width={40}
            height={40}
            alt="Dummy Image"
          />
          <div className="ml-2">{cell.getValue()}</div>
        </div>
      ),
    },
    {
      header: "Multiplier",
      accessorKey: "multiplier",
      cell: ({ cell, row }) => (
        <div>
          {row.original.subscribed ? (
            <Input
              type="number"
              value={multiplierChanges[row.original.id] || cell.getValue()}
              onChange={(e) =>
                setMultiplierChanges({
                  ...multiplierChanges,
                  [row.original.id]: e.target.value,
                })
              }
            />
          ) : (
            <DialogTrigger asChild>
              <Button
                variant="addUser"
                onClick={(e) =>
                  setEvent({
                    event: "Subscribe",
                    id: row.original.id,
                    name: row.original.username,
                  })
                }
              >
                Subscribe
              </Button>
            </DialogTrigger>
          )}
        </div>
      ),
    },
    {
      header: "Subscribed",
      accessorKey: "subscribed",
    },
    {
      header: "Active",
      accessorKey: "active",
    },
    {
      header: "Unrealized PnL",
      accessorKey: "total_unrealised_pnl",
      cell: ({ cell, row }) => (
        <div
          className={`flex flex-row items-center font-semibold ${
            cell.getValue() < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {cell.getValue() > 0 ? "+" : ""}
          {cell.getValue().toFixed(2)}
        </div>
      ),
    },
    {
      header: "Realized PnL",
      accessorKey: "total_realised_pnl",
      cell: ({ cell, row }) => (
        <div
          className={`flex flex-row items-center font-semibold ${
            cell.getValue() < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {cell.getValue() > 0 ? "+" : ""}
          {cell.getValue().toFixed(2)}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex flex-row items-center">
          {row.original.subscribed ? (
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() =>
                  setEvent({
                    event: "Shutdown",
                    id: row.original.id,
                    name: row.original.username,
                  })
                }
              >
                Shutdown
              </Button>
            </DialogTrigger>
          ) : (
            <div></div>
          )}
          {row.original.active ? (
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                onClick={() =>
                  setEvent({
                    event: "Squareoff",
                    id: row.original.id,
                    name: row.original.username,
                  })
                }
              >
                Squareoff Today
              </Button>
            </DialogTrigger>
          ) : (
            <div></div>
          )}
        </div>
      ),
    },
  ];

  //* Expected format of data from backend
  // const data = [
  //   {
  //     id: 1,
  //     name: "Esharky",
  //     unrealizedPnL: "-90",
  //     realizedPnL: "+5000",
  //   },
  //   {
  //     id: 2,
  //     name: "Aadeesh",
  //     unrealizedPnL: "+10",
  //     realizedPnL: "+500",
  //   },
  //   {
  //     id: 3,
  //     name: "Abhishek",
  //     unrealizedPnL: "+100",
  //     realizedPnL: "+1000",
  //   },
  // ];
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [event, setEvent] = useState({});

  const AlgoTabs = [
    { label: "Config", value: "Config" },
    { label: "Variables", value: "Variables" },
    { label: "Transactions", value: "Transactions" },
  ];

  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = localStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  async function fetchCombinedStrategyMetrics(token) {
    getAlgoMetricsUserwise(token, params.id, daily).then((res) => {
      console.log(res);
      let data = [];
      for (const [key, val] of Object.entries(res)) {
        if (key == "ltps") {
          continue;
        }
        if (val.enabled == false) {
          continue;
        }
        data.push(val);
      }
      console.log(data);
      setData(data);
    });
  }
  const [multiplierChanges, setMultiplierChanges] = useState({});
  const [daily, setDaily] = useState(true);
  useEffect(() => {
    checkLogin().then((token) => {
      fetchCombinedStrategyMetrics(token);
    });
    const interval = setInterval(() => {
      checkLogin().then((token) => {
        fetchCombinedStrategyMetrics(token);
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [daily]);

  return (
    <div className="bg-[#F8FCFF] w-full h-[100vh] relative overflow-auto">
      <div className="flex flex-row w-full pt-10">
        <Breadcrumbs
          crumbs={[
            { text: "Algo Trade", path: "/algotrade" },
            { text: searchParams.get("strategy_name") },
          ]}
        />
      </div>
      <Tabs
        defaultValue="daily"
        value={daily ? "daily" : "alltime"}
        onValueChange={(e) => {
          setDaily(e === "daily");
        }}
        className="w-[400px] mx-12 pt-3"
      >
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="account">Make changes to your account here.</TabsContent> */}
        {/* <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>
      <div className="mx-12">
        {/* Tabs for Multiplier, Variables, and Transaction Journals */}
        <div className="pt-2">
          <Tabs
            defaultValue={AlgoTabs[0].value}
            value={activeTab}
            onValueChange={(e) => setActiveTab(e)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={AlgoTabs[0].value} className="text-xl">
                {AlgoTabs[0].label}
              </TabsTrigger>
              <TabsTrigger value={AlgoTabs[1].value} className="text-xl">
                {AlgoTabs[1].label}
              </TabsTrigger>
              <TabsTrigger value={AlgoTabs[2].value} className="text-xl">
                {AlgoTabs[2].label}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="py-6 w-full h-full">
          {/* Conditionally render content based on the active tab */}
          {activeTab === "Config" && (
            <AlgoTradeTable
              columns={column}
              data={data}
              event={event}
              setEvent={setEvent}
              token={token}
              strategy_id={params.id}
              strategy_name={searchParams.get("strategy_name")}
              multiplierChanges={multiplierChanges}
            />
          )}
          {activeTab === "Variables" && <Variable />}
          {activeTab === "Transactions" && <TrxJournals />}
        </div>
      </div>
    </div>
  );
}

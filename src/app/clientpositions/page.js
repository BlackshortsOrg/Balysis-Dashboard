"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ClientPositionsTable } from "@/components/ClientPositions/ClientPositionsTable";
import ControlPanelButton from "@/components/ClientPositions/ControlPanelButton";
import { activeClientPositionsAPI } from "@/api/activePositions";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { squareOffUser } from "@/api/squareOffUsers";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const clientpositions = () => {
  const [token, setToken] = useState("")
  const [otp, setOTP] = useState("")
  async function squareOffUserToday(user_id) {
    await squareOffUser(token, otp, user_id, false)
    toast("Squared Off User for Today")
  }

  async function shutdownUser(user_id) {
    await squareOffUser(token, otp, user_id, true)
    toast("Shutdown User")
  }
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ cell, row }) => (
        <div
          className="flex flex-row items-center hover:underline hover:cursor-pointer"
          onClick={(e) =>
          (document.location.href =
            "/clientpositions/" + row.original.id + `?name=${cell.getValue()}`)
          }
        >
          <Image
            className="rounded-full"
            src="/images/dummy.png"
            width={40}
            height={40}
          />
          <p className="ml-2">{cell.getValue()}</p>
        </div>
      ),
    },
    {
      header: "Broker",
      accessorKey: "broker",
      cell: ({ cell }) => {
        const broker = cell.getValue();
        if (broker === "fyers") {
          return (
            <div>
              <Image
                className="rounded-full"
                src="/images/fyers.jpeg"
                width={40}
                height={40}
              />
            </div>
          );
        }
        if (broker === "iifl") {
          return (
            <div>
              <Image
                className="rounded-full"
                src="/images/iifllogo.jpeg"
                width={40}
                height={40}
              />
            </div>
          );
        } else {
          return (
            <Image
              className="rounded-full"
              src="/images/zerodhalogo.avif"
              width={40}
              height={40}
            />
          );
        }
      },
    },
    {
      header: "Margin",
      accessorKey: "margin",
    },
    {
      header: "Unrealized PnL",
      accessorKey: "unrealized",
    },
    {
      header: "Realized PnL",
      accessorKey: "realized",
    },
    {
      header: "No. of Strategies",
      accessorKey: "no_strategies",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div>asd</div>
      ),
    },
  ];

  const [daily, setDaily] = useState(true)
  const [table_data, setTableData] = useState([]);
  const [total_data, setTotalData] = useState({
    total_realized_pnl: 0,
    total_unrealized_pnl: 0,
    total_strategies: 0,
    total_margin: 0,
  });
  async function callAPI(token, daily) {
    const resp = await activeClientPositionsAPI(token, daily);
    console.log(resp);
    const tot = {
      total_realized_pnl: resp.totalMetrics.total_realised_pnl.toFixed(2),
      total_unrealized_pnl: resp.totalMetrics.total_unrealised_pnl.toFixed(2),
      total_strategies: resp.totalMetrics.total_strategies - 1,
      total_margin: 0,
    };
    let data = [];

    for (const x in resp.userPnl) {
      const obj = resp.userPnl[x];
      data.push({
        id: x,
        name: obj.name,
        // broker: "fyers",
        broker: obj.broker,
        margin: parseFloat(obj.margin.total).toFixed(2),
        unrealized: parseFloat(obj.total_unrealised_pnl).toFixed(2),
        realized: parseFloat(obj.total_realised_pnl).toFixed(2),
        no_strategies: obj.subscribed_strategies - 1,
      });
      tot.total_margin += parseFloat(obj.margin.total);
    }
    tot.total_margin = tot.total_margin.toFixed(2);
    setTableData(data);
    setTotalData(tot);
  }
  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tkn = sessionStorage.getItem("token");
      setToken(tkn)
      return tkn
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token, daily);
    });
    const interval = setInterval(() => {
      checkLogin().then((token) => {
        callAPI(token, daily);
      });
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [daily]);

  return (
    <div className="h-screen w-full mx-8">
      <h1 className="text-4xl font-semibold mt-10">Active Positions</h1>
      <div className="my-4 flex flex-row">
        <ControlPanelButton token={token} />
        <div className="pt-1 mx-4">Relaized P/L:</div>
        <div className={"pt-1 mx-4 font-semibold " + (total_data.total_realized_pnl < 0 ? "text-red-500" : "text-green-500")}>
          Rs {total_data.total_realized_pnl}
        </div>
        <div className="pt-1 mx-4">Unrelaized P/L:</div>
        <div className={"pt-1 mx-4 font-semibold " + (total_data.total_unrealized_pnl < 0 ? "text-red-500" : "text-green-500")}>
          Rs {total_data.total_unrealized_pnl}
        </div>
        <div className="pt-1 mx-4">Total Available Margin:</div>
        <div className="pt-1 mx-4 text-green-500 font-semibold">
          {total_data.total_margin}
        </div>
        <div className="pt-1 mx-4">Total Strategies:</div>
        <div className="pt-1 mx-4 text-green-400 font-semibold">
          {total_data.total_strategies}
        </div>
      </div>
      <div>
        <Tabs defaultValue="daily" value={daily ? "daily" : "alltime"} onValueChange={(e) => { setDaily(e === "daily") }} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="account">Make changes to your account here.</TabsContent> */}
          {/* <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
      </div>
      <ClientPositionsTable columns={columns} data={table_data} />
    </div >
  );
};

export default clientpositions;

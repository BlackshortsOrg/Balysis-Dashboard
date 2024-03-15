"use client";
import React, { useEffect, useState } from "react";
import { UserTable } from "@/components/ManualTrade/table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { toast } from "sonner";
import { activeClientPositionsAPI } from "@/api/activePositions";
import { getManualSignals } from "@/api/getManualSignals";
import {
  PlusIcon,
  Pencil2Icon,
  GearIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import TradeButton from "@/components/ManualTrade/tradeButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reverse } from "lodash";
import { cancelTradeAPI } from "@/api/cancelOrder";
import { Button } from "@/components/ui/button";
import OpenOrders from "@/components/ManualTrade/OpenOrders";

// const data = [
//   {
//     id: 1,
//     name: "Esharky",
//     broker: "Fyers",
//     margin: 10000,
//     unrealized: 5000,
//     realized: 5000,
//     no_strategies: 2,
//   },
//   {
//     id: 2,
//     name: "Aadeesh",
//     broker: "Fyers",
//     margin: 10000,
//     unrealized: 5000,
//     realized: 5000,
//     no_strategies: 2,
//   },
//   {
//     id: 3,
//     name: "Abhishek",
//     broker: "Zerodha",
//     margin: 10000,
//     unrealized: 5000,
//     realized: 5000,
//     no_strategies: 8,
//   },
// ];

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ cell, row }) => (
      <div className="flex flex-row items-center">
        <Image
          className="rounded-full"
          src="/images/dummy.png"
          width={40}
          height={40}
        />
        <a
          className="ml-2 hover:underline"
          href={`/clientpositions/${row.original.id}`}
        >
          {cell.getValue()}
        </a>
      </div>
    ),
  },
  {
    header: "Broker",
    accessorKey: "broker",
    cell: ({ cell }) => {
      const broker = cell.getValue();
      if (broker === "Fyers") {
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
      <div className="flex flex-row items-center">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Trade <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Square Off</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Reduce QTY by Half</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Convert all Position to MIS</MenubarItem>
              <MenubarItem>Convert all Position to NRML</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    ),
  },
];

const accounts = () => {
  const [signals_data, setSignalsData] = useState([]);
  const [rowSelection, setRowSelection] = React.useState([]);
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  async function fetchSignals(token) {
    const resp = await getManualSignals(token);
    console.log(resp);
    setSignalsData(reverse(resp));
  }

  async function callAPI(token) {
    const resp = await activeClientPositionsAPI(token);
    console.log(resp);
    let data = [];

    for (const x in resp.userPnl) {
      const obj = resp.userPnl[x];
      data.push({
        id: x,
        name: obj.name,
        broker: "Fyers",
        margin: parseFloat(obj.margin.total).toFixed(2),
        unrealized: parseFloat(obj.total_unrealised_pnl).toFixed(2),
        realized: parseFloat(obj.total_realised_pnl).toFixed(2),
        no_strategies: obj.subscribed_strategies - 1,
      });
    }
    setData(data);
  }
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      setToken(tk);
      return tk;
    }
  }
  useEffect(() => {
    checkLogin().then((token) => {
      fetchSignals(token);
      callAPI(token);
    });
  }, []);

  return (
    <div className="h-screen w-full mx-8 overflow-auto">
      <h1 className="text-4xl font-semibold mt-10">Manual Trade</h1>
      <div className="flex">
        <div className="my-4 inline-block">
          <TradeButton rowSelection={rowSelection} data={data} />
        </div>
        <a
          href="/sets"
          className="flex my-4 bg-[#41AFFF] text-white py-1 px-4 rounded-lg ml-4"
        >
          <AiOutlineCodeSandbox className="mt-1" />
          Sets
        </a>
      </div>
      <UserTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <h1 className="text-4xl font-semibold mt-10 mb-2">Open Orders</h1>
      {/* <button className="px-4 border">Daily</button> */}
      {/* <button className="px-4 border">All Time</button> */}
      <OpenOrders />
    </div>
  );
};

export default accounts;

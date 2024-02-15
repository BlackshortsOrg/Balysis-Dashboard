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

const data = [
  {
    id: 1,
    name: "Esharky",
    broker: "Fyers",
    margin: 10000,
    unrealized: 5000,
    realized: 5000,
    no_strategies: 2,
  },
  {
    id: 2,
    name: "Aadeesh",
    broker: "Fyers",
    margin: 10000,
    unrealized: 5000,
    realized: 5000,
    no_strategies: 2,
  },
  {
    id: 3,
    name: "Abhishek",
    broker: "Zerodha",
    margin: 10000,
    unrealized: 5000,
    realized: 5000,
    no_strategies: 8,
  },
];

const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ cell, row }) => (
      <div className="flex flex-row items-center hover:underline hover:cursor-pointer" onClick={(e) => document.location.href = "/clientpositions/" + row.original.id}>
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
              <MenubarItem>Square Off</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Reduce QTY by Half</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Convert NRML to MIS</MenubarItem>
              <MenubarItem>Convert MIS to NRML</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    ),
  },
];

const clientpositions = () => {
  const [table_data, setTableData] = useState([])
  const [total_data, setTotalData] = useState({ total_realized_pnl: 0, total_unrealized_pnl: 0, total_strategies: 0, total_margin: 0 })
  async function callAPI() {
    const resp = await activeClientPositionsAPI()
    console.log(resp)
    const tot = {
      total_realized_pnl: resp.totalMetrics.total_realised_pnl,
      total_unrealized_pnl: resp.totalMetrics.total_unrealised_pnl,
      total_strategies: resp.totalMetrics.total_strategies,
      total_margin: 0
    }
    let data = []

    for (const x in resp.userPnl) {
      const obj = resp.userPnl[x]
      data.push({
        id: x,
        name: obj.name,
        broker: "Fyers",
        margin: obj.margin.total,
        unrealized: obj.total_unrealised_pnl,
        realized: obj.total_realised_pnl,
        no_strategies: obj.subscribed_strategies
      })
      tot.total_margin += parseFloat(obj.margin.total)
    }
    setTableData(data)
    setTotalData(tot)
  }
  useEffect(() => {
    callAPI()
  }, [])

  return (
    <div className="h-screen w-full mx-8">
      <h1 className="text-4xl font-semibold mt-10">Active Client Positions</h1>
      <div className="my-4 flex flex-row">
        <ControlPanelButton />
        <div className="pt-1 mx-4">Relaized P/L</div>
        <div className="pt-1 mx-4 text-green-400">Rs {total_data.total_realized_pnl}</div>
        <div className="pt-1 mx-4">Unrelaized P/L</div>
        <div className="pt-1 mx-4 text-green-400">Rs {total_data.total_unrealized_pnl}</div>
        <div className="pt-1 mx-4">Total Available Margin</div>
        <div className="pt-1 mx-4 text-green-400">{total_data.total_margin}</div>
        <div className="pt-1 mx-4">Total Strategies</div>
        <div className="pt-1 mx-4 text-green-400">{total_data.total_strategies}</div>
      </div>
      <ClientPositionsTable columns={columns} data={table_data} />
    </div>
  );
};

export default clientpositions;

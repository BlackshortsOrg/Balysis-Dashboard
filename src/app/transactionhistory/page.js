"use client";
import React, { useEffect, useState } from "react";
import { TxTable } from "@/components/TransactionHistory/table";
import Image from "next/image";
import { getTransactionHistoryAPI } from "@/api/getTransactionHistory";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const columns = [
  {
    header: "Transaction ID",
    accessorKey: "transaction_id",
    width: "auto",
  },
  {
    header: "Time",
    accessorKey: "created_at",
  },
  {
    header: "Signal ID",
    accessorKey: "id",
    cell: ({ cell, row }) => {
      console.log(row)
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="text-blue-500 cursor-pointer">{cell.getValue()}</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col">
              <p className="text-xs font-semibold">Signal Type: {row.original.signal_type}</p>
              <p className="text-xs">Order Type: {row.original.order_type}</p>
              <p className="text-xs">Ref ID: {row.original.ref_id}</p>
              <p className="text-xs">Ticker: {`${row.original.exchange}:${row.original.symbol}-${row.original.exchange}-${row.original.product_type}`}</p>
              <p className="text-xs">Limit Price: {row.original.limit_price}</p>
              <p className="text-xs">Stop Price: {row.original.stop_price}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    }
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ cell }) => (
      <div className="flex flex-row items-center">
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
    header: "Strategy",
    accessorKey: "strategy_name",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ cell }) => {
      switch (cell.getValue()) {
        case "PENDING":
          return (
            <div>
              <p className="bg-yellow-200 text-yellow-600 font-semibold text-xs border-yellow-600 py-1 border w-20 pl-2 rounded-sm">
                PENDING
              </p>
            </div>
          );
        case "TRADED":
          return (
            <div>
              <p className="bg-green-200 text-green-600 font-semibold text-xs border-green-600 py-1 border w-20 pl-2 rounded-sm">
                TRADED
              </p>
            </div>
          );
        case "FILLED":
          return (
            <div>
              <p className="bg-green-200 text-green-600 font-semibold text-xs border-green-600 py-1 border w-20 pl-2 rounded-sm">
                FILLED
              </p>
            </div>
          );
        case "REJECTED":
          return (
            <div>
              <p className="bg-green-200 text-green-600 font-semibold text-xs border-green-600 py-1 border w-20 pl-2 rounded-sm">
                REJECTED
              </p>
            </div>
          );
        case "FAILED":
          return (
            <div>
              <p className="bg-red-200 text-red-600 font-semibold text-xs border-red-600 w-24 py-1 border text-center rounded-sm">
                FAILED
              </p>
            </div>
          );
        case "CANCELLED":
          return (
            <div>
              <p className="bg-red-200 text-red-600 font-semibold text-xs border-red-600 w-24 py-1 border pl-2 rounded-sm">
                CANCELLED
              </p>
            </div>
          );
      }
    },
  },
  {
    header: "Traded Price",
    accessorKey: "traded_price",
  },
  {
    header: "Traded Qty",
    accessorKey: "filledqty",
  },
  {
    header: "Message",
    accessorKey: "message"
  }
];

const transactionhistory = () => {

  const [data, setData] = useState([])
  async function callAPI() {
    const data = await getTransactionHistoryAPI()
    setData(data)
  }

  useEffect(() => {
    callAPI()
  }, [])

  return (
    <div className="h-screen w-full mx-8 overflow-auto">
      <h1 className="text-4xl my-4 font-semibold">Transaction History</h1>
      <TxTable columns={columns} data={data} />
    </div>
  );
};

export default transactionhistory;

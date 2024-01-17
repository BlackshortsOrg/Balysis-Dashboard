"use client";
import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/Accounts/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import AddUserButton from "@/components/Accounts/addUserButton";

const data = [
  {
    transactionid: 1,
    time: "2021-08-01 12:00:00",
    name: "Esharky",
    signalid: "abcde-asd-asd",
    status: "PENDING",
    security: "NIFTY",
    price: 10000,
    qty: 23,
  },
  {
    transactionid: 2,
    time: "2021-08-01 12:00:05",
    name: "Esharky",
    signalid: "abcde-asd-asd",
    status: "TRADED",
    security: "NIFTY",
    price: 10000,
    qty: 23,
  },
  {
    transactionid: 3,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "CANCELLED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 3,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "CANCELLED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 3,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "TRADED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 3,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "TRADED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 3,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "TRADED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 4,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "TRADED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 5,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "TRADED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
  {
    transactionid: 6,
    time: "2021-08-01 12:00:05",
    name: "Abhishek",
    signalid: "asdkj-asd-qwe",
    status: "TRADED",
    security: "BANKNIFTY",
    price: 200,
    qty: 13,
  },
];

const columns = [
  {
    header: "Transaction ID",
    accessorKey: "transactionid",
    width: "auto",
  },
  {
    header: "Time",
    accessorKey: "time",
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
    header: "Signal ID",
    accessorKey: "signalid",
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
    header: "Security",
    accessorKey: "security",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Qty",
    accessorKey: "qty",
  },
];

const transactionhistory = () => {
  return (
    <div className="h-screen w-full mx-8">
      <h1 className="text-4xl my-4 font-semibold">Transaction History</h1>
      <UserTable columns={columns} data={data} />
    </div>
  );
};

export default transactionhistory;

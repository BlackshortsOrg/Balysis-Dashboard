"use client";
import React from "react";
import { UserTable } from "@/components/ManualTrade/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PlusIcon,
  Pencil2Icon,
  GearIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
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

const signals_data = [
  {
    id: 1,
    time: "27 JAN 2024 9:00 AM",
    signal_id: "e5125ed5-5047-418f-a577-3dacd53a2c2c",
    strategy_id: 1,
    user_id: 1,
    status: "TRADED",
    traded_price: 250.0,
    qty: 2,
    message: "Buy 2 lots of NIFTY 50",
  },
];

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
    header: "id",
    accessorKey: "id",
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
  const [rowSelection, setRowSelection] = React.useState([]);
  return (
    <div className="h-screen w-full mx-8">
      <h1 className="text-4xl font-semibold mt-10">Manual Trade</h1>
      <div className="my-4">
        <TradeButton rowSelection={rowSelection} data={data} />
      </div>
      <UserTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <h1 className="text-4xl font-semibold mt-10">All Signals</h1>
      <Table>
        <TableCaption>All list of your recent manual signals</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Time</TableHead>
            <TableHead>Signal ID</TableHead>
            <TableHead>Strategy ID</TableHead>
            <TableHead className="">User ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Traded Price</TableHead>
            <TableHead>Traded Qty</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signals_data.map((signal) => (
            <TableRow key={signal.id}>
              <TableCell className="">{signal.time}</TableCell>
              <TableCell>{signal.signal_id}</TableCell>
              <TableCell>{signal.strategy_id}</TableCell>
              <TableCell className="">{signal.user_id}</TableCell>
              <TableCell>{signal.status}</TableCell>
              <TableCell>{signal.traded_price}</TableCell>
              <TableCell>{signal.qty}</TableCell>
              <TableCell>{signal.message}</TableCell>
              <TableCell>
                <Pencil2Icon />
              </TableCell>
              <TableCell>
                <TrashIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default accounts;

"use client";
import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Listbox } from "@headlessui/react";

import Image from "next/image";
import { getTransactionHistoryAPI } from "@/api/getTransactionHistory";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const status_options = ["PENDING", "TRADED", "REJECTED", "FAILED", ""];

function TrnxJournals({ columns, data }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilterStatus, setSelectedFilterStatus] = React.useState();
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
    enableRowSelection: true,
  });

  const all_users = ["", ...new Set(data.map((item) => item.name))];
  const all_strategies = [
    "",
    ...new Set(data.map((item) => item.strategy_name)),
  ];

  return (
    <div>
      <div className="flex flex-row">
        <div className="">
          <Listbox
            value={table.getColumn("strategy_name")?.getFilterValue() ?? ""}
            onChange={(value) => {
              table.getColumn("strategy_name")?.setFilterValue(value);
            }}
          >
            <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
              Filter Strategies{" "}
              {table.getColumn("strategy_name")?.getFilterValue() ?? " "}
            </Listbox.Button>
            <Listbox.Options>
              {all_strategies.map((option) => (
                <Listbox.Option key={option} value={option}>
                  {option ? option : "None"}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="">
          <Listbox
            value={table.getColumn("status")?.getFilterValue() ?? ""}
            onChange={(value) => {
              table.getColumn("status")?.setFilterValue(value);
            }}
          >
            <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
              Filter Status {table.getColumn("status")?.getFilterValue() ?? " "}
            </Listbox.Button>
            <Listbox.Options>
              {status_options.map((option) => (
                <Listbox.Option key={option} value={option}>
                  {option ? option : "None"}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="">
          <Listbox
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(value) => {
              table.getColumn("name")?.setFilterValue(value);
            }}
          >
            <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
              Filter Name {table.getColumn("name")?.getFilterValue() ?? " "}
            </Listbox.Button>
            <Listbox.Options>
              {all_users.map((option) => (
                <Listbox.Option key={option} value={option}>
                  {option ? option : "None"}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="">
          <Input
            placeholder="Filter messages..."
            value={table.getColumn("message")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("message")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => console.log("Row Clicked", row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

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
      console.log(row);
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="text-blue-500 cursor-pointer">{cell.getValue()}</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col">
              <p className="text-xs font-semibold">
                Signal Type: {row.original.signal_type}
              </p>
              <p className="text-xs">Order Type: {row.original.order_type}</p>
              <p className="text-xs">Ref ID: {row.original.ref_id}</p>
              <p className="text-xs">
                Ticker:{" "}
                {`${row.original.exchange}:${row.original.symbol}-${row.original.exchange}-${row.original.product_type}`}
              </p>
              <p className="text-xs">Limit Price: {row.original.limit_price}</p>
              <p className="text-xs">Stop Price: {row.original.stop_price}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
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
    accessorKey: "message",
  },
];

const TrxJournals = () => {
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }

  const [data, setData] = useState([]);
  async function callAPI(token) {
    const data = await getTransactionHistoryAPI(token);
    setData(data);
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
  }, []);

  return (
    <div className="h-screen w-full mx-8 overflow-auto">
      <TrnxJournals columns={columns} data={data} />
    </div>
  );
};

export default TrxJournals;

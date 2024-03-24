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

import Image from "next/image";
import { getTransactionHistoryAPI } from "@/api/getTransactionHistory";
import { useSearchParams } from "next/navigation";
import { capitalize, filter, get, join, map, split } from "lodash";
import moment from "moment";

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
    <div className="relative">
      <div className="rounded-md border overflow-y-auto">
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
    header: "Time",
    accessorKey: "created_at",
    cell: ({ cell }) => {
      return moment(cell.getValue()).format("MMM DD, hh:mm A");
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
    cell: ({ cell, row }) => {
      if (cell.getValue() < 0) return get(row, "original.limit_price", 0);
      return cell.getValue();
    },
  },
  {
    header: "Traded Qty",
    accessorKey: "filledqty",
    cell: ({ cell }) => (cell.getValue() < 0 ? "--" : cell.getValue()),
  },
  {
    header: "Order Type",
    accessorKey: "order_type",
    cell: ({ cell }) => {
      const splitInput = split(cell.getValue(), "_");
      const formattedString = join(map(splitInput, capitalize), " ");
      return formattedString;
    },
  },
  {
    header: "Ticker",
    accessorKey: "ticker",
    cell: ({ row }) => {
      return `${row.original.exchange} | ${row.original.symbol} | ${row.original.product_type}`;
    },
  },
  {
    header: "Message",
    accessorKey: "message",
  },
];

const TrxJournals = () => {
  const searchParams = useSearchParams();
  const strategy = searchParams.get("strategy_name");
  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }

  const [data, setData] = useState([]);
  async function callAPI(token) {
    const rawData = await getTransactionHistoryAPI(token);
    //* Sanitize the data based on Strategy suggested
    const sanitizedData = filter(
      rawData,
      (data) => get(data, "strategy_name") === strategy
    );
    setData(sanitizedData);
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
  }, []);

  return (
    <div className="h-full w-full">
      <TrnxJournals columns={columns} data={data} />
    </div>
  );
};

export default TrxJournals;

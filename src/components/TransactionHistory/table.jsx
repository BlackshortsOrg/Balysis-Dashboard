"use client";
import * as React from "react";
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

const status_options = ["PENDING", "FILLED", "REJECTED", "FAILED", ""];

export function TxTable({ columns, data }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilterStatus, setSelectedFilterStatus] = React.useState();
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
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
        <div className="relative">
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
            <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
              {all_strategies.map((option) => (
                <Listbox.Option
                  className="p-1 border-1 uppercase rounded-md cursor-pointer on hover:bg-blue-400 hover:text-white"
                  key={option}
                  value={option}
                >
                  {option ? option : "None"}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="relative">
          <Listbox
            value={table.getColumn("status")?.getFilterValue() ?? ""}
            onChange={(value) => {
              table.getColumn("status")?.setFilterValue(value);
            }}
          >
            <Listbox.Button className="border shadow-sm rounded-md px-2 py-1 flex flex-col">
              Filter Status {table.getColumn("status")?.getFilterValue() ?? " "}
            </Listbox.Button>
            <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
              {status_options.map((option) => (
                <Listbox.Option
                  className="p-1 border-1 rounded-md cursor-pointer on hover:bg-blue-400 hover:text-white"
                  key={option}
                  value={option}
                >
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
            <Listbox.Options className="absolute border-2 border-blue-400 z-10 mt-1 bg-white rounded-md shadow-lg text-center">
              {all_users.map((option) => (
                <Listbox.Option
                  className="p-1 border-1 rounded-md cursor-pointer on hover:bg-blue-400 hover:text-white"
                  key={option}
                  value={option}
                >
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

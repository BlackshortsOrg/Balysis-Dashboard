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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TxTable({ table, columns, data, daily, setDaily }) {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="">
            <Input
              placeholder="Filter symbols..."
              value={table.getColumn("symbol")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("symbol")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
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
          <div className="">
            <Input
              placeholder="Filter signals..."
              value={table.getColumn("id")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        {/* <div className="text-right"> */}
        {/*   <Tabs */}
        {/*     defaultValue="daily" */}
        {/*     value={daily ? "daily" : "alltime"} */}
        {/*     onValueChange={(e) => { */}
        {/*       setDaily(e === "daily"); */}
        {/*     }} */}
        {/*     className="" */}
        {/*   > */}
        {/*     <TabsList> */}
        {/*       <TabsTrigger value="daily">Daily</TabsTrigger> */}
        {/*       <TabsTrigger value="alltime">All Time</TabsTrigger> */}
        {/*     </TabsList> */}
        {/*   </Tabs> */}
        {/* </div> */}
      </div>
      <div className="rounded-md border">
        <Table className="h-full">
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-[69vh]">
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
                        cell.getContext(),
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

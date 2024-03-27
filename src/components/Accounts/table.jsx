"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { squareOffUser } from "@/api/squareOffUsers";
import { enableUser } from "@/api/enableUser";
import { toast } from "sonner";

export function UserTable({
  columns,
  data,
  openDialog,
  setOpenDialog,
  toEnableUser,
  toEnable,
  refresh,
  setRefresh,
  token,
}) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
  });
  const [otp, setOTP] = React.useState("");

  return (
    <>
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
                            header.getContext(),
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
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            {toEnable
              ? `Enable User ${toEnableUser.name}`
              : `Disable User ${toEnableUser.name}`}
          </DialogHeader>
          <DialogDescription className="mx-auto">
            <InputOTP maxLength={6} value={otp} onChange={setOTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </DialogDescription>
          <Button
            variant="addUser"
            onClick={() => {
              if (toEnable) {
                enableUser(token, otp, toEnableUser.id).then((res) => {
                  if (res.status !== 200) {
                    toast.error("Something went wrong", {});
                    setRefresh(!refresh);
                    setOpenDialog(false);
                  } else {
                    toast.success("User Enabled", {});
                    setRefresh(!refresh);
                    setOpenDialog(false);
                  }
                });
              } else {
                squareOffUser(token, otp, toEnableUser.id, false).then(
                  (res) => {
                    if (res.status !== 200) {
                      toast.error("Something went wrong", {});
                      setRefresh(!refresh);
                      setOpenDialog(false);
                    } else {
                      toast.success("User Disabled", {});
                      setRefresh(!refresh);
                      setOpenDialog(false);
                    }
                  },
                );
              }
            }}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
